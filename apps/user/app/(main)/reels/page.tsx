import SwiperWrapper from '@/components/common/layouts/wrapper/SwiperWrapper';
import { reelsVideoData } from '@/data/swiperData';
import Link from 'next/link';

export default function page() {
  // const initialVideos = await getReelsVideos(1, 5);

  return (
    <SwiperWrapper initialItems={reelsVideoData}>
      <Link
        href="/reels"
        className="absolute top-5 left-5 z-10 text-4xl font-semibold tracking-tighter text-white font-poppins"
      >
        Reels
      </Link>
    </SwiperWrapper>
  );
}
