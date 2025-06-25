import ChatHeader from '@/components/common/layout/header/ChatHeader';
import DmBar from '@/components/common/form/DmBar';
import { UseChat } from '@/context/ChatContext';
import { UseModal } from '@/context/ModalContext';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ChatMessageList from '@/components/chat/room/ChatMessageList';
import { ChatMessageDataPage } from '@/data/chatData';

export default async function page() {
  const userUuid = (await getServerSession(options))?.user.buskerUuid || '';
  const ChatMessageData = await ChatMessageDataPage;
  return (
    <div className="relative flex-3/4 text-white">
      <ChatHeader />
      <main className="flex px-4 bg-blue-400 rounded-tr-4xl">
        <UseModal>
          <ChatMessageList chatListData={ChatMessageData} userUuid={userUuid} />
        </UseModal>
      </main>
      <UseChat>
        <UseModal>
          <DmBar />
        </UseModal>
      </UseChat>
    </div>
  );
}
