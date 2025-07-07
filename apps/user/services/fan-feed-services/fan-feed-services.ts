import { FanFeedDataType } from '@/types/ResponseDataTypes';

// API 응답 타입 정의
interface FanFeedResponse {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  code: number;
  result: {
    content: {
      id: string;
      content: string;
      location?: string;
      hashTag?: string[];
      humanTag?: {
        uuid: string;
        humanType: string;
        nickname: string;
      }[];
      fileList?: {
        fileName: string;
        fileUrl: string;
        thumbnailUrl: string;
        fileType: string;
      }[];
      likeCount: number;
      commentCount: number;
      createdAt: string;
    }[];
    hasNext: boolean;
    nextCursor: string | null;
  };
}

export const fetchFanFeeds = async (
  size: number = 10,
  lastId?: string,
  sortType: 'LATEST' | 'LIKES' | 'COMMENTS' = 'LATEST'
): Promise<FanFeedDataType[]> => {
  try {
    const writerUuid = '4774f95c-42bf-4615-bf0e-0f499ed3711a'; // 특정 버스커의 UUID
    const baseUrl = 'http://3.38.58.133:8000/feed-read-service/api/v1/read/feed/fan/busker';
    
    // URL 쿼리 파라미터 구성
    const queryParams = new URLSearchParams();
    queryParams.append('sortType', sortType);
    queryParams.append('size', size.toString());
    if (lastId) {
      queryParams.append('lastId', lastId);
    }
    
    const url = `${baseUrl}/${writerUuid}?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': '*/*'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }
    
    const data: FanFeedResponse = await response.json();
    
    if (!data.isSuccess) {
      throw new Error(`API 오류: ${data.message}`);
    }
    
    // API 응답을 FanFeedDataType 형식으로 변환
    return data.result.content.map(item => {
      const createdDate = new Date(item.createdAt);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60));
      const timeAgo = `${diffInHours}시간 전`;
      
      return {
        id: item.id,
        buskerName: item.humanTag?.[0]?.nickname || '버스커',
        buskerProfileImage: item.fileList?.[0]?.thumbnailUrl || '/buskerUrl.jpg',
        timeAgo: timeAgo,
        content: item.content,
        imageSrcList: item.fileList?.map(file => file.fileUrl) || [],
        likesCount: item.likeCount,
        commentsCount: item.commentCount,
        realsId: item.id
      };
    });
  } catch (error) {
    console.error('팬 피드를 가져오는데 실패했습니다:', error);
    // API 요청 실패시 빈 배열 반환
    return [];
  }
};
