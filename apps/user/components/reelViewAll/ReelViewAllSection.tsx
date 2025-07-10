'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getBuskerReels } from '@/services/reel-services/reel-services';
import { ReelItem } from '@/services/reel-services/reel-services';
import Image from 'next/image';
import { Play, Heart, MessageSquare } from '@repo/ui/components/icons';
import ReelsModal from '@/components/common/modal/ReelsModal';

type ReelViewAllSectionProps = {
  writerUuid: string;
  initialReels: ReelItem[];
};

export default function ReelViewAllSection({
  writerUuid,
  initialReels,
}: ReelViewAllSectionProps) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['buskerReels', writerUuid],
      queryFn: async ({ pageParam }: { pageParam?: string }) => {
        const response = await getBuskerReels({
          writerUuid,
          lastId: pageParam, // pageParam에 nextCursor 값 사용
          sortType: 'LATEST', // 정렬 기준 명시적 지정
          size: 9, // 3x3 그리드
        });
        return response;
      },
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => {
        // API가 반환하는 nextCursor 사용 (API 문서 기준)
        return lastPage?.hasNext ? lastPage.nextCursor || undefined : undefined;
      },
      initialData: () => {
        if (initialReels.length > 0) {
          return {
            pages: [
              {
                content: initialReels,
                hasNext: true,
                // nextCursor 값 초기화
                nextCursor: initialReels[initialReels.length - 1]?.id || null,
              },
            ],
            pageParams: [undefined],
          };
        }
        return undefined;
      },
    });

  useEffect(() => {
    const target = observerTarget.current;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (target) {
      observerRef.current.observe(target);
    }

    return () => {
      if (observerRef.current && target) {
        observerRef.current.unobserve(target);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const reels = data?.pages.flatMap((page) => page.content) || [];
  const isLoading = status === 'pending';

  // 릴스 클릭 핸들러
  const handleReelClick = (reelId: string) => {
    setOpenModalId(reelId);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  return (
    <div className="w-full border-t-2 border-white pt-5">
      <div className="grid grid-cols-3 gap-2 md:gap-4 p-2 md:p-4">
        {reels.map((reel) => (
          <div
            key={reel.id}
            onClick={() => handleReelClick(reel.id)}
            className="group relative block aspect-[9/16] rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
          >
            <div className="relative w-full h-full">
              <Image
                src={reel.thumbnailUrl || '/images/default-thumbnail.jpg'}
                alt={reel.content || 'Reel thumbnail'}
                fill
                className="object-cover transition-opacity group-hover:opacity-75"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white bg-opacity-80 rounded-full p-3">
                  <Play className="w-6 h-6 text-gray-900" fill="currentColor" />
                </div>
              </div>

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent">
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <div className="flex items-center mt-1 space-x-4 text-xs">
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {reel.likeCount.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {reel.commentCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {(isLoading || isFetchingNextPage) && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="h-10" />

      {/* No results message */}
      {!isLoading && reels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No reels found</p>
        </div>
      )}

      {/* 릴스 모달 */}
      <ReelsModal
        open={openModalId !== null}
        onClose={handleCloseModal}
        videos={reels.map((reel) => ({
          id: reel.id,
          url: reel.videoUrl,
          thumbnail: reel.thumbnailUrl,
        }))}
        initialIndex={reels.findIndex((reel) => reel.id === openModalId)}
      />
    </div>
  );
}
