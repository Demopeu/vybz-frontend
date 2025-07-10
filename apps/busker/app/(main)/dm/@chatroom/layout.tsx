import ChatSubscribe from './_subscribe/ChatSubscribe';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ChatSubscribe />
      {children}
    </>
  );
}
