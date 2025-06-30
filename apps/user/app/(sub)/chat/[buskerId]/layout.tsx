import { getServerSession } from 'next-auth';
import ChatSubscribe from './_subscribe/ChatSubscribe';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { UseChatRoom } from '@/context/ChatRoomContext';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid;
  return (
    <>
      <UseChatRoom>
        <ChatSubscribe userUuid={userUuid || ''} />
        {children}
      </UseChatRoom>
    </>
  );
}
