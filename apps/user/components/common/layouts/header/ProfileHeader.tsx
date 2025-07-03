import { Bell, ChevronLeft } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui';
import Link from 'next/link';
import Image from 'next/image';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getUserInfo } from '@/services/user-services';

export default async function ProfileHeader() {
  const session = await getServerSession(options);
  const userImage = await getUserInfo(session?.user?.userUuid || '');

  return (
    <header className="fixed top-0 left-0 right-0 z-54 px-4 py-3.5 text-white bg-transparent flex items-center justify-between">
      <Link href="/main" className="flex-shrink-0 py-1">
        <ChevronLeft width={28} height={28} />
      </Link>
      <div className="space-x-2 flex items-center">
        <Link href="/notifications">
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent text-white"
          >
            <Bell className="!w-6 !h-6" />
          </Button>
        </Link>
        <div className="relative w-8 h-8 shrink-0">
          <Link href="/mypage">
            <Image
              src={userImage?.profileImageUrl || '/defaultProfile.png'}
              alt="Busker"
              fill
              className="rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
