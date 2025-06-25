export default function layout({
  chatlist,
  chatroom,
}: {
  chatlist: React.ReactNode;
  chatroom: React.ReactNode;
}) {
  return (
    <div className="flex">
      {chatlist}
      {chatroom}
    </div>
  );
}
