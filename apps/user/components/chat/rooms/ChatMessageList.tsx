'use client';

import { use, useEffect } from 'react';
import ChatMessageItem from '@/components/chat/rooms/ChatMessageItem';
import {
  ChatMessageListType,
  ChatMessageType,
} from '@/types/ResponseDataTypes';
import ReverseInfiniteScrollWrapper from '@/components/common/layouts/wrapper/ReverseInfiniteScrollWrapper';
import { useInfiniteCursorQuery } from '@/hooks/useInfiniteCursorQuery';
import { getChatMessages } from '@/services/chat-services/chat-message-list-services';
import { ChatRoomContext } from '@/context/ChatRoomContext';
import EmptyList from '@/components/chat/rooms/EmptyList';

interface ChatMessageListProps {
  chatRoomId: string | null;
  userUuid: string;
  buskerUuid: string;
}

export default function ChatMessageList({
  chatRoomId,
  userUuid,
  buskerUuid,
}: ChatMessageListProps) {
  const { 
    messages: contextMessages,
    setBuskerUuid,
    setUserUuid,
    setChatRoomId
  } = use(ChatRoomContext);

  // context에 uuid와 chatRoomId 설정 (로컬 저장소 복원을 위해)
  useEffect(() => {
    if (buskerUuid) setBuskerUuid(buskerUuid);
    if (userUuid) setUserUuid(userUuid);
    if (chatRoomId) setChatRoomId(chatRoomId);
  }, [buskerUuid, userUuid, chatRoomId, setBuskerUuid, setUserUuid, setChatRoomId]);

  const {
    items: fetchedMessages,
    fetchMore,
    hasMore,
    isLoading,
  } = useInfiniteCursorQuery<ChatMessageListType, ChatMessageType>({
    queryKey: `chatMessageList-${chatRoomId}-${userUuid}`,
    queryFn: async (cursor: string | null) => {
      if (!chatRoomId || !userUuid || !buskerUuid) {
        return {
          content: [],
          nextCursor: null,
          hasNext: false,
          pageSize: 0,
        };
      }

      const response = await getChatMessages({
        chatRoomId: chatRoomId.toString(),
        participantUuid: userUuid,
        sentAt: cursor || undefined,
        pageSize: 20,
      });
      return response.result;
    },
    getNextCursor: (lastPage) => lastPage.nextCursor,
    selectItems: (pages) => pages.flatMap((page) => page.content),
    initialData: {
      content: [],
      nextCursor: null,
      hasNext: false,
      pageSize: 0,
    },
  });

  // 더 이상 서버 메시지를 context에 추가하지 않음 (중복 방지)
  // displayMessages에서 만 합쳐서 표시

  if (!chatRoomId || !userUuid) {
    return <EmptyList />;
  }

  // context 메시지와 서버 메시지를 합치고 중복 제거
  const messageMap = new Map<string, ChatMessageType>();
  
  // 1. context 메시지를 먼저 추가 (임시 메시지 우선)
  contextMessages.forEach((msg) => {
    messageMap.set(msg.id, msg);
  });
  
  // 2. 서버 메시지는 중복되지 않는 경우만 추가
  fetchedMessages.forEach((fetchedMsg) => {
    if (!messageMap.has(fetchedMsg.id)) {
      messageMap.set(fetchedMsg.id, fetchedMsg);
    }
  });
  
  // 3. Map에서 배열로 변환 후 시간순 정렬
  const displayMessages = Array.from(messageMap.values()).sort((a, b) => 
    new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );
  
  // 디버깅 로그
  console.log('Context 메시지 수:', contextMessages.length);
  console.log('Fetched 메시지 수:', fetchedMessages.length);
  console.log('최종 표시 메시지 수:', displayMessages.length);

  return (
    <ReverseInfiniteScrollWrapper
      hasNextPage={hasMore}
      isLoading={isLoading}
      fetchMore={fetchMore}
    >
      <section className="w-full px-2 pb-20 flex flex-col-reverse">
        {displayMessages
          .filter((msg: ChatMessageType) => msg.content !== 'ping')
          .map((msg: ChatMessageType, index) => (
            <ChatMessageItem
              key={`${msg.id}-${msg.sentAt}-${index}`}
              message={msg}
              currentUserUuid={userUuid || ''}
            />
          ))}
      </section>
    </ReverseInfiniteScrollWrapper>
  );
}
