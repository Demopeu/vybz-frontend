'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Bell, ChevronLeft, Search } from '@repo/ui/components/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BuskerResponseType } from '@/types/ResponseDataTypes';
import { unstable_ViewTransition as ViewTransition } from 'react';

export default function ChatHeader({
  buskerUuid,
  buskerInfo,
}: {
  buskerUuid: string;
  buskerInfo: BuskerResponseType;
}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="fixed left-0 right-0 z-54 w-full text-white flex items-center justify-between bg-blue-400">
      <div className="flex items-center space-x-2 py-4 pl-4 pr-10  bg-black rounded-tr-4xl flex-2/5 border-b-0 border-black">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="[&_svg]:size-7 p-0"
        >
          <ChevronLeft />
        </Button>
        <Link
          href={`/busker/${buskerUuid}`}
          className="flex items-center space-x-2"
        >
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src={buskerInfo.profileImageUrl}
              alt="Busker"
              fill
              sizes="40px"
              className="rounded-full object-cover"
            />
          </div>
          <div className="ml-1">
            <h3 className="font-bold">{buskerInfo.nickname}</h3>
            <p className="text-sm text-gray-400">Busker</p>
          </div>
        </Link>
      </div>
      <div className="flex-2/5 bg-black rounded-tl-4xl border-0">
        <ViewTransition name="blue-label">
          <div className="flex items-center justify-end space-x-4 pr-10 py-4.5 bg-blue-400 rounded-bl-4xl">
            <Button className="[&_svg]:size-7 p-1 border-2 border-black rounded-full shrink-0">
              <Bell />
            </Button>
            <Button className="[&_svg]:size-7 p-1 border-2 border-black rounded-full shrink-0">
              <Search />
            </Button>
          </div>
        </ViewTransition>
      </div>
    </header>
  );
}
