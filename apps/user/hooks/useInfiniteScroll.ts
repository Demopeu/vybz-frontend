import { useState, useCallback } from 'react';

type ItemWithId = { id?: string; realsId?: string; streamKey?: string; };

export function useInfiniteScroll<T extends ItemWithId>({
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

    // 마지막 아이템의 ID를 lastId로 사용 (여러 ID 필드 중에서 사용 가능한 것 선택)
    const lastItem = items[items.length - 1];
    const currentLastId = lastItem?.streamKey || lastItem?.realsId || lastItem?.id;
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