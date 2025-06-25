import ChatSectionHeader from '@/components/common/layout/header/ChatSectionHeader';
import InfiniteChatList from '@/components/chat/list/InfiniteChatList';
import { getChatList } from '@/services/chat-services/chat-list-services';

export default async function ChatListPage() {
  const chatListData = await getChatList();
  console.log(chatListData);

  return (
    <main className="font-poppins space-y-10 flex-1/4 min-h-3/5">
      <section className="px-8 pt-5 text-white">
        <ChatSectionHeader />
        <InfiniteChatList
          chatList={chatListData.content}
          nextCursor={chatListData.nextCursor}
          hasNext={chatListData.hasNext}
        />
      </section>
    </main>
  );
}
