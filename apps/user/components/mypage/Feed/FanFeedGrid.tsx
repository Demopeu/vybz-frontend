'use client';

import { FanFeedDataType } from '@/types/ResponseDataTypes';
import Image from 'next/image';
import InfiniteScrollWrapper from '@/components/common/layouts/wrapper/InfiniteScrollWrapper';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { fetchFanFeeds } from '@/services/fan-feed-services/fan-feed-services';
import { useMemo } from 'react';

// 기본 이미지 경로 목록 설정
const DEFAULT_IMAGES: readonly string[] = [
  '/feed.jpg',
  '/feed2.png',
  '/feed3.jpg',
  '/feed4.jpg',
  '/feed5.jpg'
];

// ID를 기반으로 피드 아이템에 고정된 이미지를 선택하는 함수
const getFixedRandomImage = (id: string | number | undefined): string => {
  // id가 undefined인 경우 랜덤 값 사용
  if (id === undefined) {
    const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
    return DEFAULT_IMAGES[randomIndex] as string;
  }
  
  // 숫자로 처리하여 픽스해지는 인덱스 계산
  let numericValue = 0;
  if (typeof id === 'string') {
    // 문자열 ID를 숫자로 변환 (예: 문자열의 코드점수 합)
    for (let i = 0; i < id.length; i++) {
      numericValue += id.charCodeAt(i);
    }
  } else {
    numericValue = id;
  }
  
  // 숫자 값을 이미지 배열 길이로 나눈 나머지 계산
  const index = numericValue % DEFAULT_IMAGES.length;
  return DEFAULT_IMAGES[index] as string;
};

interface FanFeedGridItemProps {
  feed: FanFeedDataType;
  onClick?: () => void;
}

function FanFeedGridItem({ feed, onClick }: FanFeedGridItemProps) {
  // console.log(feed); // 디버깅용 로그 제거

  const content = feed.content || '';
  
  // feed.id를 사용해 고정된 랜덤 이미지 선택 (리렌더링 시에도 같은 이미지 유지)
  const defaultImage = useMemo(() => {
    return getFixedRandomImage(feed.id || Math.random().toString());
  }, [feed.id]); // feed.id가 변경되지 않는 한 같은 이미지 유지

  // imageSrcList 유효성 체크 - undefined 처리 추가
  const hasImageList =
    feed.imageSrcList &&
    Array.isArray(feed.imageSrcList) &&
    feed.imageSrcList.length > 0;

  // 첫 번째 이미지가 null이 아닌지 체크 (타입스크립트 에러 수정)
  const firstImage =
    hasImageList && feed.imageSrcList ? feed.imageSrcList[0] : null;
  const hasValidImage =
    hasImageList && firstImage !== null && firstImage !== '';

  return (
    <div
      className="aspect-square relative overflow-hidden bg-div-background cursor-pointer"
      onClick={onClick}
    >
      {/* imageSrcList가 비어있으면 콘텐츠 표시, 이미지가 있지만 null이면 기본 이미지, 이미지가 정상이면 표시 */}
      {!hasImageList ? (
        // imageSrcList가 없거나 비어있을 때 -> 콘텐츠 표시
        <div className="w-full h-full flex items-center justify-center text-white text-sm p-2 overflow-hidden">
          <p className="line-clamp-6 text-center">{content}</p>
        </div>
      ) : hasValidImage ? (
        // 정상적인 이미지가 있을 때 -> 이미지 표시
        <Image
          src={firstImage || defaultImage}
          alt={`${feed.buskerName}'s feed`}
          fill
          className="object-cover"
        />
      ) : (
        // 이미지 리스트는 있지만 첫 번째 값이 null/빈 문자열일 때 -> 기본 이미지 표시
        <Image
          src={defaultImage}
          alt={`${feed.buskerName}'s feed`}
          fill
          className="object-cover"
        />
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

      {/* 피드가 없을 때 메시지 */}
      {!isLoading && feeds.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">공지사항이 없습니다</p>
        </div>
      )}
    </section>
  );
}
