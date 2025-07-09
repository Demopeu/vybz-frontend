'use client';

import { FanFeedDataType } from '@/types/ResponseDataTypes';
import Image from 'next/image';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { fetchFanFeeds } from '@/services/fan-feed-services/fan-feed-services';

// 기본 이미지 경로 설정
const DEFAULT_IMAGE = '/feed.jpg';

// 빈 문자열 체크 및 기본 이미지로 대체하는 함수
const getValidImageSrc = (src: string | undefined): string => {
  if (!src || src.trim() === '') {
    return DEFAULT_IMAGE;
  }
  return src;
};

interface FanFeedGridItemProps {
  feed: FanFeedDataType;
  onClick?: () => void;
}

function FanFeedGridItem({ feed, onClick }: FanFeedGridItemProps) {
  // 이미지 여부 확인 - 개선된 아주 엄격한 검사\
  console.log(feed.imageSrcList);
  const validImages =
    feed.imageSrcList?.filter(
      (img) => img && typeof img === 'string' && img.trim() !== ''
    ) || [];

  const hasValidImage = validImages.length > 0;
  const firstImage = hasValidImage ? validImages[0] : '';
  const content = feed.content || '';

  return (
    <div
      className="aspect-square relative overflow-hidden bg-div-background cursor-pointer"
      onClick={onClick}
    >
      {hasValidImage ? (
        <Image
          src={getValidImageSrc(firstImage)}
          alt={`${feed.buskerName}'s feed`}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white text-sm p-2 overflow-hidden">
          <p className="line-clamp-6 text-center">{content}</p>
        </div>
      )}
    </div>
  );
}

export default function FanFeedGrid({
  userName,
  initialFeeds,
}: {
  userName?: string;
  initialFeeds: FanFeedDataType[];
}) {
  const {
    items: feeds,
    loading: isLoading,
    hasMore: hasNextPage,
    fetchMore,
  } = useInfiniteScroll<FanFeedDataType>({
    fetchFn: fetchFanFeeds,
    initialItems: initialFeeds,
    pageSize: 9, // 3x3 그리드에 맞게 9개씩 로드
  });

  return (
    <section className="mx-auto px-4 py-6 mt-4">
      <h2 className="text-2xl font-bold text-white mb-1">
        {userName ? `${userName}'s` : ''} 공지사항
      </h2>
      <p className="text-gray-400">버스커의 공지사항을 확인하세요</p>

      <InfiniteScrollWrapper
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        fetchMore={fetchMore}
      >
        <div className="mt-6 border-t border-gray-300 pt-5">
          <div className="grid grid-cols-3 gap-0">
            {feeds.map((feed) => (
              <FanFeedGridItem
                key={feed.id}
                feed={feed}
                onClick={() => {
                  // 클릭 이벤트 처리 (필요시 여기에 모달 열기 등의 로직 추가)
                  console.log('Feed clicked:', feed.id);
                }}
              />
            ))}
          </div>
        </div>
      </InfiniteScrollWrapper>

      {/* 로딩 표시기 */}
      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {/* 피드가 없을 때 메시지 */}
      {!isLoading && feeds.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">공지사항이 없습니다</p>
        </div>
      )}
    </section>
  );
}
