import Image from 'next/image';
import type { LiveCardType } from '@/types/LiveCardType';
import Link from 'next/link';
import MembershipBadge from '@/components/common/badge/MembershipBadge';

export default function LiveCard(props: LiveCardType) {
  return (
    <article className="p-1">
      <Link href={`/live/${props.id}`} className="block">
        <Image
          src={props.imageUrl}
          alt={`${props.nickname}의 라이브 썸네일`}
          width={112}
          height={120}
          className="object-cover bg-gray-500 rounded-xl"
        />
        <footer className="w-28 text-center mt-1 text-xs">
          <p className="font-semibold truncate">{props.title}</p>
          <p className="font-semibold truncate">{props.nickname}</p>
          {props.membership && <MembershipBadge />}
        </footer>
      </Link>
    </article>
  );
}
