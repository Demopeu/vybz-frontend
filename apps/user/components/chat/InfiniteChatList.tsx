'use client';

import { ChatListType } from '@/types/ResponseDataTypes';
import { useInfiniteScrollQuery } from '@/hooks/useInfiniteFetchQuery';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import ChatListItem from '@/components/chat/ChatListItem';
import { getChatList } from '@/services/chat-services/chat-list-services';

export default function InfiniteChatList({
  chatList,
}: {
  chatList: ChatListType[];
}) {
  const {
    items: AllChatList,
    isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScrollQuery<ChatListType>({
    queryKey: 'chatList',
    queryFn: async (page, pageSize) => {
      const response = await getChatList(page, pageSize);
      return { content: response.data };
    },
    initialData: chatList,
    pageSize: chatList.length,
  });

  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      onIntersect={fetchMore}
    >
      {AllChatList.map((item) => (
        <ChatListItem key={item.chatId} chatListItem={item} />
      ))}
    </InfiniteScrollWrapper>
  );
}
