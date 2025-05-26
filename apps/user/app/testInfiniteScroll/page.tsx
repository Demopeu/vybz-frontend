'use client';

import { useState } from 'react';
import InfiniteScrollWrapper from '@/components/infiniteScroll/infiniteScrollWrapper';

export default function TestInfiniteScrollPage() {
  const [items, setItems] = useState<string[]>(
    Array.from({ length: 20 }, (_, i) => `아이템 ${i + 1}`)
  );
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreItems = async () => {
    setIsLoading(true);

    // 1초 딜레이 주기 (로딩 느낌)
    await new Promise((resolve) => setTimeout(resolve, 100));

    const nextItems = Array.from(
      { length: 20 },
      (_, i) => `아이템 ${items.length + i + 1}`
    );

    setItems((prev) => [...prev, ...nextItems]);
    setHasNextPage(items.length + nextItems.length < 1000); // 총 100개까지만
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">무한 스크롤 테스트</h1>

      <InfiniteScrollWrapper
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        onIntersect={fetchMoreItems}
      >
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded shadow-sm">
              {item}
            </li>
          ))}
        </ul>
      </InfiniteScrollWrapper>
    </div>
  );
}
