'use client';

import { use, useEffect } from 'react';
import ChatMessageItem from '@/components/chat/room/ChatMessageItem';
import {
  ChatMessageListType,
  ChatMessageType,
} from '@/types/ResponseDataTypes';
import ReverseInfiniteScrollWrapper from '@/components/common/layout/wrapper/ReverseInfiniteScrollWrapper';
import { useInfiniteCursorQuery } from '@/hooks/useInfiniteCursorQuery';
import { getChatMessages } from '@/services/chat-services/chat-message-list-services';
import { ChatRoomContext } from '@/context/ChatRoomContext';
import EmptyList from '@/components/chat/room/EmptyList';

export default function ChatMessageList() {
  const {
    messages: contextMessages,
    addMessages,
    chatRoomId,
    userUuid,
    buskerUuid,
  } = use(ChatRoomContext);

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
        participantUuid: buskerUuid,
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

  useEffect(() => {
    if (fetchedMessages.length > 0 && contextMessages.length === 0) {
      addMessages(fetchedMessages);
    }
  }, [fetchedMessages, contextMessages.length, addMessages]);

  if (!chatRoomId || !userUuid) {
    return <EmptyList />;
  }

  const displayMessages =
    contextMessages.length > 0 ? contextMessages : fetchedMessages;

  return (
    <ReverseInfiniteScrollWrapper
      hasNextPage={hasMore}
      isLoading={isLoading}
      fetchMore={fetchMore}
    >
      <section className="w-full px-2 pb-20 flex flex-col-reverse">
        {displayMessages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={msg}
            currentUserUuid={userUuid || ''}
          />
        ))}
      </section>
    </ReverseInfiniteScrollWrapper>
  );
}
