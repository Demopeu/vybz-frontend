'use client';

import { useCallback, useState } from 'react';
import { generateLiveCards } from '@/mock/liveMockApi';
import type { LiveCardProps } from '@/types/LiveCardType';

export function useLiveCards() {
  const [page, setPage] = useState(1);
  const [lives, setLives] = useState<LiveCardProps[]>(generateLiveCards(0));
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreLives = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextLives = generateLiveCards(lives.length);
      setLives((prev) => [...prev, ...nextLives]);

      if (page >= 3) {
        setHasNextPage(false);
      } else {
        setPage((prev) => prev + 1);
      }

      setIsLoading(false);
    }, 1000);
  }, [isLoading, lives.length, page]);

  return {
    lives,
    hasNextPage,
    isLoading,
    fetchMoreLives,
  };
}
