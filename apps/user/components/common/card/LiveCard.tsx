import Image from 'next/image';
import Link from 'next/link';
import MembershipBadge from '@/components/common/badge/MembershipBadge';
import LiveBadge from '@/components/common/badge/LiveBadge';
import { formatNumberToKm } from '@/utils/format';
import { LiveStreamItem } from '@/services/live-services/live-services';

// buskerNickname을 포함한 확장 타입
type EnrichedLiveStreamItem = LiveStreamItem & {
  buskerNickname?: string;
};

export default function LiveCard({ item }: { item: EnrichedLiveStreamItem }) {
  return (
    <Link
      href={`/busker/${item.buskerUuid}/live/${item.streamKey}`}
      className="overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
    >
      <div className="relative w-full h-36">
        <div className="absolute top-2 left-2 right-2 z-10 flex justify-between">
          <LiveBadge />
          <span className="text-xs text-white bg-black/40 px-2 py-1 rounded-full">
            {formatNumberToKm(item.viewerCount || 0)}명
          </span>
        </div>
        <Image
          src={item.thumbnailUrl || '/defaultProfile.png'}
          alt={item.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-sm text-white truncate">{item.title}</h3>
        <p className="text-xs text-gray-400 truncate">{item.buskerNickname || '익명'}</p>
        {item.membership && <MembershipBadge />}
      </div>
    </Link>
  );
}
