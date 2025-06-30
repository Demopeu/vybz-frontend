'use client';

import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import LiveCard from '@/components/common/card/LiveCard';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { LiveFreeViewType } from '@/types/ResponseDataTypes';

import { generateLiveCards } from '@/utils/generateLiveCards';

export default function LiveViewAllSection({
  lives: initialLives,
}: {
  lives: LiveFreeViewType[];
}) {
  const fetchFn = async (
    size: number,
    lastId?: string
  ): Promise<LiveFreeViewType[]> => {
    // lastId를 페이지 번호로 변환 (없으면 1페이지로 간주)
    const page = lastId ? parseInt(lastId) + 1 : 1;
    await new Promise((res) => setTimeout(res, 1000));
    // sortType을 사용하여 정렬 방식 적용 가능
    return generateLiveCards((page - 1) * size, size);
  };

  const {
    items: lives,
    loading: isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScroll<LiveFreeViewType>({
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
            <li key={live.id}>
              <LiveCard item={live} />
            </li>
          ))}
        </ul>
      </section>
    </InfiniteScrollWrapper>
  );
}
