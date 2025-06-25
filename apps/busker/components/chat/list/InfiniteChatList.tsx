'use client';

import {
  ChatRoomListResponseType,
  ChatRoomType,
} from '@/types/ResponseDataTypes';
import { useInfiniteCursorQuery } from '@/hooks/useInfiniteCursorQuery';
import InfiniteScrollWrapper from '@/components/common/layout/wrapper/InfiniteScrollWrapper';
import ChatListItem from '@/components/chat/list/ChatListItem';
import { getChatList } from '@/services/chat-services/chat-list-services';

interface InfiniteChatListProps {
  chatList: ChatRoomType[];
  nextCursor: string | null;
  hasNext: boolean;
}

export default function InfiniteChatList({
  chatList = [],
  nextCursor = null,
  hasNext = false,
}: InfiniteChatListProps) {
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

  return (
    <div className="flex flex-col gap-4">
      <InfiniteScrollWrapper
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchMore={fetchMore}
      >
        {allChatRooms?.map((room) => {
          const otherParticipant = room.participant[0];

          return (
            <ChatListItem
              key={room.chatRoomId}
              chatId={room.chatRoomId}
              name={`User ${otherParticipant?.participantUuid?.slice(0, 6) || 'Unknown'}`}
              profileImage={'/images/default-profile.png'}
              lastMessage={room.content || 'No messages yet'}
              lastMessageTime={room.sentAt || new Date().toISOString()}
              unreadCount={otherParticipant?.unreadCount || 0}
              messageType={room.messageType}
            />
          );
        })}
      </InfiniteScrollWrapper>
    </div>
  );
}
