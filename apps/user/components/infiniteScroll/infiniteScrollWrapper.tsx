'use client';

import React, { useEffect, useRef } from 'react';
import { InfiniteScrollProps } from '../../types/InfiniteScrollTypes';

export default function InfiniteScrollWrapper({
  children,
  hasNextPage,
  isLoading,
  onIntersect,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0] as IntersectionObserverEntry;
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.5 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasNextPage, isLoading, onIntersect]);

  return (
    <>
      {children}
      <div ref={sentinelRef} className="h-6" />
    </>
  );
}
