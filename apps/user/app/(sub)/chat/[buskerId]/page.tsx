import ChatHeader from '@/components/common/layouts/header/ChatHeader';
import DmBar from '@/components/common/form/DmBar';
import { UseChat } from '@/context/ChatContext';
import { UseModal } from '@/context/ModalContext';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ChatMessageList from '@/components/chat/rooms/ChatMessageList';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { BuskerInfoReadService } from '@/services/info-services/BuskerInfoReadService';

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
    <div className="relative min-w-80 h-screen text-white">
      <ChatHeader buskerUuid={buskerId} buskerInfo={buskerInfo} />
      <ViewTransition name="blue-label">
        <main className="absolute inset-x-0 bottom-0 top-29 flex flex-col px-4 bg-blue-400 rounded-tr-4xl border-t-2 border-indigo-900">
          <UseModal>
            <ChatMessageList
              chatRoomId={chatRoomId}
              userUuid={userUuid}
              buskerUuid={buskerId}
            />
          </UseModal>
          <UseChat>
            <UseModal>
              <DmBar userUuid={userUuid} />
            </UseModal>
          </UseChat>
        </main>
      </ViewTransition>
    </div>
  );
}
