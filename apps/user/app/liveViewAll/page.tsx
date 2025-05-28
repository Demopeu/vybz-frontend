'use client';

import InfiniteScrollWrapper from '@/components/infiniteScroll/InfiniteScrollWrapper';
import LiveCardList from '@/components/liveViewAll/LiveViewALL';
import { useLiveCards } from '@/hooks/useLiveCards';

export default function Page() {
  const { lives, hasNextPage, isLoading, fetchMoreLives } = useLiveCards();

  return (
    <main>
      <InfiniteScrollWrapper
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        onIntersect={fetchMoreLives}
      >
        <LiveCardList lives={lives} />
      </InfiniteScrollWrapper>
    </main>
  );
}
