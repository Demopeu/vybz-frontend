import Image from 'next/image';
import type { LiveCardProps } from '../../types/LiveCardType';
import Link from 'next/link';

export default function LiveCard({
  id,
  nickname,
  imageUrl,
  likes,
}: LiveCardProps) {
  return (
    <article className="p-1">
      <Link href={`/live/${id}`} className="block">
        <Image
          src={imageUrl}
          alt={`${nickname}의 라이브 썸네일`}
          width={112}
          height={120}
          className="object-cover bg-gray-500 rounded-xl"
        />
        <footer className="w-28 grid place-items-center mt-1">
          <p className="text-xs font-semibold truncate">{nickname}</p>
          <p className="text-xs text-gray-500" aria-label={`좋아요 ${likes}개`}>
            ❤️ {likes}
          </p>
        </footer>
      </Link>
    </article>
  );
}
