'use client';

import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import LiveCard from '@/components/common/card/LiveCard';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { LiveStreamItem } from '@/services/live-services/live-services';
import { generateLiveCards } from '@/utils/generateLiveCards';

type EnrichedLiveStreamItem = LiveStreamItem & {
  buskerNickname?: string;
};

export default function LiveViewAllSection({
  lives: initialLives,
}: {
  lives: EnrichedLiveStreamItem[];
}) {
  const fetchFn = async (
    size: number,
    lastId?: string
  ): Promise<EnrichedLiveStreamItem[]> => {
    await new Promise((res) => setTimeout(res, 1000));
    // Generate new items with unique streamKeys based on lastId
    const startIndex = lastId ? parseInt(lastId.split('-').pop() || '0') + 1 : 0;
    return generateLiveCards(startIndex, size);
  };

  const {
    items: lives,
    loading: isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScroll<EnrichedLiveStreamItem>({
    fetchFn,
    initialItems: initialLives,
    pageSize: 6,
  });

  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      fetchMore={fetchMore}
    >
      <section aria-label="Live busker list" className="pt-10">
        <ul className="grid grid-cols-3 gap-3">
          {lives.map((live) => (
            <li key={live.streamKey}>
              <LiveCard item={live} />
            </li>
          ))}
        </ul>
      </section>
    </InfiniteScrollWrapper>
  );
}
