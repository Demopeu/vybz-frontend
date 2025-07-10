import ChatHeader from '@/components/common/layouts/header/ChatHeader';
import { UseChat } from '@/context/ChatContext';
import { UseModal } from '@/context/ModalContext';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ChatMessageList from '@/components/chat/rooms/ChatMessageList';
import { BuskerInfoReadService } from '@/services/info-services/BuskerInfoReadService';
import ChatDmBar from '@/components/chat/rooms/ChatDmBar';

interface PageProps {
  params: Promise<{
    buskerId: string;
  }>;
  searchParams: Promise<{
    chatId?: string;
  }>;
}

export default async function page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const userUuid = (await getServerSession(options))?.user.userUuid || '';
  const buskerId = resolvedParams.buskerId;
  const chatRoomId = resolvedSearchParams.chatId || null;

  const buskerInfo = await BuskerInfoReadService(buskerId);
  return (
    <div className="relative min-w-80 h-screen text-white bg-gradient-to-b from-black via-gray-900 to-black">
      <ChatHeader buskerUuid={buskerId} buskerInfo={buskerInfo} />
      <main className="absolute inset-x-0 bottom-0 top-20 flex flex-col px-4 bg-transparent">
        <UseModal>
          <ChatMessageList
            chatRoomId={chatRoomId}
            userUuid={userUuid}
            buskerUuid={buskerId}
          />
        </UseModal>
        <UseChat>
          <UseModal>
            <ChatDmBar userUuid={userUuid} />
          </UseModal>
        </UseChat>
      </main>
    </div>
  );
}
