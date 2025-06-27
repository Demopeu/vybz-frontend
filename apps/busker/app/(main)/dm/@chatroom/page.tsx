import ChatHeader from '@/components/common/layout/header/ChatHeader';
import DmBar from '@/components/common/form/DmBar';
import { UseChat } from '@/context/ChatContext';
import { UseModal } from '@/context/ModalContext';
import ChatMessageList from '@/components/chat/room/ChatMessageList';

export default function page() {
  return (
    <div className="relative flex-3/4 text-white">
      <ChatHeader />
      <main className="flex px-4 bg-blue-400 rounded-tr-4xl">
        <UseModal>
          <ChatMessageList />
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
