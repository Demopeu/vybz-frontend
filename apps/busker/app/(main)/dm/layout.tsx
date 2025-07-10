import { UseChatRoom } from '@/context/ChatRoomContext';

export default function layout({
  chatlist,
  chatroom,
}: {
  chatlist: React.ReactNode;
  chatroom: React.ReactNode;
}) {
  return (
    <UseChatRoom>
      <div className="flex">
        {chatlist}
        {chatroom}
      </div>
    </UseChatRoom>
  );
}
