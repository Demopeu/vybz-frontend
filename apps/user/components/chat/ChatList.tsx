import { ChatListDataType } from '@/types/ResponseDataTypes';
import Link from 'next/link';
import { NotePencil } from '@repo/ui/components/icons';
import EmptyChatList from './EmptyChatList';
import InfiniteChatList from './InfiniteChatList';

export default function ChatList({
  chatListData,
}: {
  chatListData: ChatListDataType;
}) {
  return (
    <section className="px-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">메세지</h2>
        <Link href="/chat/create">
          <NotePencil width={32} height={32} />
        </Link>
      </div>

      {chatListData.data.length === 0 ? (
        <EmptyChatList />
      ) : (
        <InfiniteChatList chatList={chatListData.data} />
      )}
    </section>
  );
}
