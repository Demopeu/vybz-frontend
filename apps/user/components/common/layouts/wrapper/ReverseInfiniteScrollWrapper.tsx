'use client';

import React, { useEffect, useRef } from 'react';
import { InfiniteScrollProps } from '@/types/InfiniteScrollTypes';
import Spinner from '@/components/common/spinners/Spinner';

export default function ReverseInfiniteScrollWrapper({
  children,
  hasNextPage,
  isLoading,
  fetchMore,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollHeightRef = useRef<number>(0);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // 기존 scrollHeight 저장
          prevScrollHeightRef.current =
            scrollContainerRef.current?.scrollHeight ?? 0;
          fetchMore(); // fetchMore 호출
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.1,
      }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasNextPage, isLoading, fetchMore]);

  // 새 데이터가 위에 추가되면 스크롤 위치 보정
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const newHeight = container.scrollHeight;
    const oldHeight = prevScrollHeightRef.current;

    if (newHeight > oldHeight) {
      container.scrollTop += newHeight - oldHeight;
    }
  }, [children]);

  return (
    <div
      ref={scrollContainerRef}
      className="grow overflow-y-auto flex flex-col"
    >
      {/* 스크롤 최상단 감지용 sentinel */}
      <div ref={sentinelRef} className="h-6" />
      {children}
      {isLoading && (
        <div className="h-10 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
