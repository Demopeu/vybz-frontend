'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import LiveCard from '@/components/common/card/LiveCard';
import { LiveStreamItem } from '@/services/live-services/live-services';

// 확장된 LiveStreamItem 타입 정의
type EnrichedLiveStreamItem = LiveStreamItem & {
  buskerNickname?: string;
};

export default function LiveFreeViewSwiper({
  data,
}: {
  data: EnrichedLiveStreamItem[];
}) {
  return (
    <Swiper slidesPerView={'auto'} spaceBetween={16}>
      {data.map((item) => (
        <SwiperSlide key={item.streamKey} style={{ width: '140px' }}>
          <LiveCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
