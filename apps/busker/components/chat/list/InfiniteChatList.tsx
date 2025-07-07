'use client';

import {
  ChatRoomListResponseType,
  ChatRoomType,
  UserInfoDataType,
} from '@/types/ResponseDataTypes';
import { useInfiniteCursorQuery } from '@/hooks/useInfiniteCursorQuery';
import InfiniteScrollWrapper from '@/components/common/layout/wrapper/InfiniteScrollWrapper';
import ChatListItem from '@/components/chat/list/ChatListItem';
import { getChatList } from '@/services/chat-services/chat-list-services';
import { getUserInfo } from '@/services/user-services/UserInfoServices';
import { useState, use, useMemo, useEffect, useRef } from 'react';
import { ChatRoomContext } from '@/context/ChatRoomContext';
import { useQueryClient } from '@tanstack/react-query';

export default function InfiniteChatList({
  chatList = [],
  nextCursor = null,
  hasNext = false,
}: {
  chatList: ChatRoomType[];
  nextCursor: string | null;
  hasNext: boolean;
}) {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { setChatRoomId, setUserUuid, setBuskerUuid } = use(ChatRoomContext);
  const {
    items: allChatRooms,
    isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteCursorQuery<ChatRoomListResponseType, ChatRoomType>({
    queryKey: 'chatRooms',
    queryFn: async (cursor) => {
      const response = await getChatList(cursor || undefined);
      return response;
    },
    getNextCursor: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : null,
    selectItems: (pages) => pages.flatMap((page) => page.content),
    initialData: {
      content: chatList,
      nextCursor: nextCursor || '',
      hasNext: hasNext,
      pageSize: 10,
    },
  });

  // 사용자 정보를 가져오기 위한 배열 준비
  const participantUuids = useMemo(() => {
    return (
      allChatRooms
        ?.map((room) => {
          const otherParticipant = room.participant[1];
          return otherParticipant?.participantUuid || '';
        })
        .filter((uuid) => !!uuid) || []
    );
  }, [allChatRooms]);

  // 사용자 정보를 저장할 상태
  const [userInfoMap, setUserInfoMap] = useState<
    Record<string, UserInfoDataType>
  >({});
  const [userInfoLoadingMap, setUserInfoLoadingMap] = useState<
    Record<string, boolean>
  >({});
  const userInfoMapRef = useRef(userInfoMap);
  const userInfoLoadingMapRef = useRef(userInfoLoadingMap);

  // QueryClient 가져오기
  const queryClient = useQueryClient();

  // useEffect를 사용하여 렌더링 단계가 아닌 이펙트 단계에서 데이터 가져오기
  useEffect(() => {
    userInfoMapRef.current = userInfoMap;
  }, [userInfoMap]);

  useEffect(() => {
    userInfoLoadingMapRef.current = userInfoLoadingMap;
  }, [userInfoLoadingMap]);

  useEffect(() => {
    // 유효한 UUID가 있는 경우에만 실행
    if (participantUuids.length > 0) {
      console.log('Fetching user info for:', participantUuids);

      // 실제로 가져와야 할 UUID만 필터링
      const uuidsToFetch = participantUuids.filter(
        (uuid) =>
          uuid &&
          !userInfoMapRef.current[uuid] &&
          !userInfoLoadingMapRef.current[uuid]
      );

      if (uuidsToFetch.length === 0) {
        console.log('No new UUIDs to fetch');
        return;
      }

      console.log('Actually fetching for:', uuidsToFetch);

      // 각 UUID에 대해 사용자 정보 가져오기
      const fetchUserInfo = async () => {
        // 로딩 상태 설정 (한 번만)
        const newLoadingMap: Record<string, boolean> = {};
        uuidsToFetch.forEach((uuid) => {
          newLoadingMap[uuid] = true;
        });

        setUserInfoLoadingMap((prev) => ({ ...prev, ...newLoadingMap }));

        // 함수형 업데이트를 사용하여 최신 상태를 참조
        const promises = uuidsToFetch.map(async (uuid) => {
          try {
            // 캐시에서 먼저 확인
            const cachedData = queryClient.getQueryData<UserInfoDataType>([
              'userInfo',
              uuid,
            ]);
            if (cachedData) {
              return { uuid, data: cachedData };
            }

            const data = await getUserInfo(uuid);
            queryClient.setQueryData(['userInfo', uuid], data);
            return { uuid, data };
          } catch (error) {
            console.error(`Error fetching user info for ${uuid}:`, error);
            return {
              uuid,
              data: {
                nickname: '알 수 없음',
                profileImageUrl: '/defaultProfile.png',
                followingCount: 0,
                subscribeCount: 0,
                vticketCount: 0,
              },
            };
          }
        });

        const results = await Promise.all(promises);

        // 상태 업데이트 (한 번에)
        setUserInfoMap((prevUserInfoMap) => {
          const newUserInfoMap = { ...prevUserInfoMap };
          let hasChanges = false;

          results.forEach(({ uuid, data }) => {
            if (uuid && data && !newUserInfoMap[uuid]) {
              newUserInfoMap[uuid] = data;
              hasChanges = true;
            }
          });

          return hasChanges ? newUserInfoMap : prevUserInfoMap;
        });

        // 로딩 상태 업데이트 (한 번에)
        setUserInfoLoadingMap((prevLoadingMap) => {
          const updatedLoadingMap = { ...prevLoadingMap };
          uuidsToFetch.forEach((uuid) => {
            updatedLoadingMap[uuid] = false;
          });
          return updatedLoadingMap;
        });
      };

      fetchUserInfo();
    }
  }, [participantUuids, queryClient]);

  return (
    <div className="flex flex-col gap-4">
      <InfiniteScrollWrapper
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchMore={fetchMore}
      >
        {useMemo(() => {
          return allChatRooms?.map((room) => {
            const otherParticipant = room.participant[1];
            const participantUuid = otherParticipant?.participantUuid || '';
            // Remove the invalid buskerUuid access since it doesn't exist on ChatRoomParticipantType
            // const buskerUuid = participant?.buskerUuid || '';
            const handleSelect = () => {
              setSelectedChatId(room.chatRoomId);
              setChatRoomId(room.chatRoomId);
              setUserUuid(participantUuid);

              // 현재 채팅방의 busker UUID 설정 (첫 번째 참가자)
              const buskerParticipant = room.participant[0];
              const buskerUuid = buskerParticipant?.participantUuid || '';
              setBuskerUuid(buskerUuid);
            };

            // 참가자 UUID로 사용자 정보 가져오기
            const isLoading = userInfoLoadingMap[participantUuid] || false;
            const userInfo = userInfoMap[participantUuid] || {
              nickname: '알 수 없음',
              profileImageUrl: '/defaultProfile.png',
              followingCount: 0,
              subscribeCount: 0,
              vticketCount: 0,
            };

            console.log(
              `ChatItem ${room.chatRoomId} - participantUuid: ${participantUuid}, userInfo:`,
              userInfo
            );

            return (
              <ChatListItem
                key={room.chatRoomId}
                chatId={room.chatRoomId}
                userInfo={userInfo}
                lastMessage={room.content || '삭제된 메세지 입니다'}
                lastMessageTime={room.sentAt || new Date().toISOString()}
                unreadCount={room.participant[0]?.unreadCount || 0}
                messageType={room.messageType}
                isSelected={selectedChatId === room.chatRoomId}
                onSelect={handleSelect}
                isLoading={isLoading}
              />
            );
          });
        }, [
          allChatRooms,
          selectedChatId,
          setChatRoomId,
          setUserUuid,
          setBuskerUuid,
          userInfoMap,
          userInfoLoadingMap,
        ])}
      </InfiniteScrollWrapper>
    </div>
  );
}
