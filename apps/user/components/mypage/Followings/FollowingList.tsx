'use client';

import { useState } from 'react';
import FollowingBuskerBox from './FollowingBuskerBox';
import { FollowingDataType } from '@/types/ResponseDataTypes';

export default function FollowingList({ data }: { data: FollowingDataType[] }) {
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);

  const handleMenuToggle = (buskerId: string) => {
    setOpenedMenuId(openedMenuId === buskerId ? null : buskerId);
  };

  return (
    <section className="mt-4 font-poppins text-white space-y-4">
      {data.map((following) => (
        <FollowingBuskerBox
          key={following.buskerId}
          buskerName={following.buskerName}
          buskerId={following.buskerId}
          buskerProfileImage={following.buskerProfileImage}
          isMenuOpen={openedMenuId === following.buskerId}
          onMenuToggle={() => handleMenuToggle(following.buskerId)}
        />
      ))}
    </section>
  );
}
