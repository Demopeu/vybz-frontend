import { Button } from '@repo/ui/components/ui/button';
import ChatBar from '@/components/common/form/ChatBar';
import { UseChat } from '@/context/ChatContext';

export default function page() {
  return (
    <main className="h-screen">
      <section className="flex">
        <div className="flex">
          <Button>Follow</Button>
          <div></div>
        </div>
      </section>
      <UseChat>
        <ChatBar className="px-4" />
      </UseChat>
    </main>
  );
}
