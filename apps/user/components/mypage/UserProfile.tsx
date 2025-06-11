import Image from 'next/image';
import Link from 'next/link';
import { CrossedTools } from '@repo/ui/components/icons';

export default function UserProfile() {
  return (
    <section className="flex justify-between items-center px-6 pt-10 text-white font-poppins">
      <div className="relative w-10 h-10 shrink-0">
        <Image
          src="/buskerUrl.jpg"
          alt="user avatar"
          fill
          sizes="40px"
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="font-bold text-base">Hello,카리나</p>
        <p className="font-light text-xs">Today 09 Nov. 2025</p>
      </div>
      <div>
        <Link href="/mypage/info/edit">
          <div className="w-10 h-10 border-2 border-gray-600 rounded-full flex items-center justify-center cursor-pointer p-2">
            <CrossedTools className="text-gray-600" />
          </div>
        </Link>
      </div>
    </section>
  );
}
