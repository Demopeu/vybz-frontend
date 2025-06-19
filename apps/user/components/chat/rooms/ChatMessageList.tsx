'use client';

import ChatMessageItem from '@/components/chat/rooms/ChatMessageItem';
import { ChatMessageListType } from '@/types/ResponseDataTypes';

export default function ChatList({
  chatListData,
  userUuid,
}: {
  chatListData: ChatMessageListType;
  userUuid: string;
}) {
  return (
    <section className="w-full px-2 pt-8 pb-20">
      {chatListData.content.map((msg) => (
        <ChatMessageItem
          key={msg.id}
          message={msg}
          currentUserUuid={userUuid}
        />
      ))}
    </section>
  );
}
