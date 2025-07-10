import { instance } from '@/utils/requestHandler';

export type ReelItem = {
  id: string;
  writerUuid: string;
  content: string;
  thumbnailUrl: string;
  videoUrl: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
};

export type ReelListResponse = {
  content: ReelItem[];
  hasNext: boolean;
  nextCursor: string | null;
};


type GetReelsParams = {
  writerUuid: string;
  lastId?: string;
  sortType?: 'LATEST' | 'LIKES' | 'COMMENTS';
  size?: number;
};

export const getBuskerReels = async ({
  writerUuid,
  lastId,
  sortType = 'LATEST',
  size = 10,
}: GetReelsParams): Promise<ReelListResponse> => {
  const params = new URLSearchParams();
  
  // 필수 파라미터 추가
  params.append('sortType', sortType);
  params.append('size', size.toString());
  
  // lastId가 있을 경우 추가 (페이지네이션)
  if (lastId) {
    params.append('lastId', lastId);
  }

  try {
    // API 응답 타입을 올바르게 지정
    const response = await instance.get(
      `/feed-read-service/api/v1/read/feed/reels/busker/${writerUuid}?${params.toString()}`
    );

    // 스웨거 문서와 일치하는 구조의 API 응답 처리
    if (response && response.isSuccess && response.result) {
      return response.result as ReelListResponse;
    }
    
    console.log('API returned success=false or empty result', response);
    
  } catch (error) {
    console.error('Error fetching busker reels:', error);
  }
  
  // 응답이 없거나 오류 발생 시 기본값 반환
  return {
    content: [],
    hasNext: false,
    nextCursor: null
  };
};
