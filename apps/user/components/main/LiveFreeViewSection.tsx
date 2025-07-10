import Link from 'next/link';
import LiveFreeViewSwiper from '@/components/common/swiper/LiveFreeViewSwiper';
import { LiveStreamItem } from '@/services/live-services/live-services';

// 확장된 LiveStreamItem 타입 정의
type EnrichedLiveStreamItem = LiveStreamItem & {
  buskerNickname?: string;
};

export default function LiveFreeViewSection({
  data,
}: {
  data: EnrichedLiveStreamItem[];
}) {
  return (
    <section className="absolute top-164 left-0 right-0 px-6 mt-10 pb-20">
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-white text-xl font-semibold">Now Live</h2>
        <Link href="/liveViewAll" className="text-sm text-gray-400">
          View All
        </Link>
      </div>

      <LiveFreeViewSwiper data={data} />
    </section>
  );
}
