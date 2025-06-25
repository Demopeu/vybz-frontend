import { ChatListData } from '@/data/chatData';
import ChatSectionHeader from '@/components/common/layout/header/ChatSectionHeader';
import InfiniteChatList from '@/components/chat/list/InfiniteChatList';

export default function page() {
  return (
    <main className="font-poppins space-y-10 flex-1/4 min-h-3/5">
      <section className="px-8 pt-5 text-white">
        <ChatSectionHeader />
        <InfiniteChatList
          chatList={ChatListData.data}
          page={ChatListData.page}
        />
      </section>
    </main>
  );
}
