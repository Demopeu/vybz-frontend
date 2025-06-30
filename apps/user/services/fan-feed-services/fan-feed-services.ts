import { FanFeedDataType } from '@/types/ResponseDataTypes';

export const fetchFanFeeds = async (
  size: number,
  lastId?: string,
  sortType: 'LATEST' | 'LIKES' | 'COMMENTS' = 'LATEST'
): Promise<FanFeedDataType[]> => {
  // lastId를 페이지 번호로 변환 (없으면 1페이지로 간주)
  const page = lastId ? parseInt(lastId) + 1 : 1;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // sortType을 사용하여 정렬 방식 적용 가능
  let result = Array.from({ length: size }, (_, i) => ({
    id: String((page - 1) * size + i + 2),
    buskerName: `버스커${(page - 1) * size + i + 1}`,
    buskerProfileImage: '/buskerUrl.jpg',
    timeAgo: `${i + 1}시간 전`,
    content: `테스트 피드 내용 ${(page - 1) * size + i + 1}`,
    imageSrcList:
      i % 3 === 0
        ? []
        : [
            '/buskerUrl.jpg',
            '/buskerUrl.jpg',
            '/buskerUrl.jpg',
          ].slice(0, (i % 3) + 1),
    likesCount: Math.floor(Math.random() * 100),
    commentsCount: Math.floor(Math.random() * 30),
    realsId: String((page - 1) * size + i + 2), // realsId 추가
  }));
  
  // sortType에 따라 정렬
  if (sortType === 'LIKES') {
    result = result.sort((a, b) => b.likesCount - a.likesCount);
  } else if (sortType === 'COMMENTS') {
    result = result.sort((a, b) => b.commentsCount - a.commentsCount);
  }
  
  return result;
};
