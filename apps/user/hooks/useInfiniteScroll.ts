import { useState, useCallback } from 'react';

export function useInfiniteScroll<T extends { realsId?: string }>({
  fetchFn,
  initialItems = [],
  pageSize = 10,
  sortType = 'LATEST',
}: {
  fetchFn: (size: number, lastId?: string, sortType?: 'LATEST' | 'LIKES' | 'COMMENTS') => Promise<T[]>;
  initialItems?: T[];
  pageSize?: number;
  sortType?: 'LATEST' | 'LIKES' | 'COMMENTS';
}) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [lastId, setLastId] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(() => {
    if (loading || !hasMore) return;

    // 마지막 아이템의 ID를 lastId로 사용
    const currentLastId = items.length > 0 ? items[items.length - 1]?.realsId : undefined;
    setLastId(currentLastId);
    
    setLoading(true);
    fetchFn(pageSize, currentLastId, sortType)
      .then((newItems) => {
        setItems((prev) => [...prev, ...newItems]);
        if (newItems.length < pageSize) setHasMore(false);
      })
      .catch((err) => {
        console.error('fetch error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, hasMore, fetchFn, items, pageSize, sortType]);

  return { items, loading, hasMore, fetchMore, lastId };
}