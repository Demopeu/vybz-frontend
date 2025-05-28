'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LiveFreeViewType } from '@/types/ResponseDataTypes';
import MembershipBadge from '@/components/common/badge/MembershipBadge';

export default function LiveFreeViewSwiper({
  data,
}: {
  data: LiveFreeViewType[];
}) {
  const router = useRouter();

  const handleItemClick = (buskerId: string) => {
    router.push(`/busker/${buskerId}/live`);
  };

  return (
    <Swiper slidesPerView={'auto'} spaceBetween={16}>
      {data.map((item) => (
        <SwiperSlide key={item.id} style={{ width: '140px' }}>
          <div
            className="rounded-xl overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleItemClick(item.buskerId)}
          >
            <div className="relative w-full h-36">
              <Image
                src={item.buskerProfileImage}
                alt={item.liveName}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="p-2 text-white">
              <h3 className="text-sm font-medium truncate">{item.liveName}</h3>
              <p className="text-xs text-gray-300 truncate">
                {item.buskerName}
              </p>
              {item.isMembership && <MembershipBadge />}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
