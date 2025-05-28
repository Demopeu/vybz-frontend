import Link from 'next/link';
import { Button } from '@repo/ui/components/ui/button';
import { Bell, Send } from '@repo/ui/components/icons';

export default function MainHeader() {
  return (
    <header className="w-full h-20 flex items-center justify-between px-4 absolute top-0 left-0 z-20 bg-transparent">
      <Link href="/main">
        <p className="font-monoton text-2xl text-white">VYBZ</p>
      </Link>
      <div className="space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-white"
        >
          <Bell className="!w-6 !h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-white"
        >
          <Send className="!w-6 !h-6" />
        </Button>
      </div>
    </header>
  );
}
