'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Mousewheel } from 'swiper/modules';

import { RealsUrlDataType } from '@/types/ResponseDataTypes';
import { getReelsVideos } from '@/services/reels-services/reels-services';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ReelsBackgroundWrapper from './backgrounds/ReelsBackgroundWrapper';
import ReelsBoxs from '@/components/reels/ReelsBoxs';

export default function SwiperWrapper({
  initialItems,
  children,
  initialPage = 1,
  pageSize = 5,
}: {
  initialItems: RealsUrlDataType[];
  children: React.ReactNode;
  initialPage?: number;
  pageSize?: number;
}) {
  SwiperCore.use([Mousewheel]);

  const swiperRef = useRef<SwiperCore | null>(null);

  const { items, fetchMore } = useInfiniteScroll<RealsUrlDataType>({
    fetchFn: getReelsVideos,
    initialItems,
    initialPage,
    pageSize,
  });

  return (
    <main className="relative h-screen w-screen">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachEnd={fetchMore}
        className="h-screen w-screen"
      >
        {items.map((item) => (
          <SwiperSlide key={item.realsId} className="relative">
            <ReelsBackgroundWrapper videoUrl={item.realsUrl} />
            <ReelsBoxs
              likeCount={item.realsLikeCount}
              reelsCommentCount={item.realsCommentCount}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {children}
    </main>
  );
}
