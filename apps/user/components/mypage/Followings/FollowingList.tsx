'use client';

import { useState, useEffect } from 'react';
import FollowingBuskerBox from './FollowingBuskerBox';
import {
  FollowingDataType,
  FollowingsResponseDataType,
} from '@/types/ResponseDataTypes';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getFollowingsUsers } from '@/services/following-services/following-services';

export default function FollowingList({
  initialFollowings,
}: {
  initialFollowings: FollowingsResponseDataType;
}) {
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);

  const {
    items: followings,
    loading: isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScroll<FollowingDataType>({
    fetchFn: async (page, pageSize) => {
      const response = await getFollowingsUsers(
        'current-user-uuid',
        page,
        pageSize
      );
      return response.content;
    },
    initialItems: initialFollowings.content ?? [],
    initialPage: initialFollowings.page || 1,
    pageSize: initialFollowings.pageSize || 20,
  });

  const handleMenuToggle = (buskerId: string) => {
    setOpenedMenuId(openedMenuId === buskerId ? null : buskerId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openedMenuId &&
        !(event.target as HTMLElement).closest(
          `[data-busker-id="${openedMenuId}"]`
        )
      ) {
        setOpenedMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openedMenuId]);

  if (!followings.length && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
        <p>팔로우 중인 버스커가 없습니다.</p>
      </div>
    );
  }

  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      onIntersect={fetchMore}
    >
      <section className="mt-4 font-poppins text-white space-y-4">
        {followings.map((following) => (
          <div key={following.buskerId} data-busker-id={following.buskerId}>
            <FollowingBuskerBox
              buskerName={following.buskerName}
              buskerId={following.buskerId}
              buskerProfileImage={following.buskerProfileImage}
              isMenuOpen={openedMenuId === following.buskerId}
              onMenuToggle={() => handleMenuToggle(following.buskerId)}
            />
          </div>
        ))}
      </section>
    </InfiniteScrollWrapper>
  );
}
