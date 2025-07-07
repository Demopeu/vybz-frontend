import { CommonResponseType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export interface CommentLikeRequest {
  commentId: string;
  likerUuid: string;
  likerType: 'USER' | 'BUSKER';
  writerUuid: string;
  writerType: 'USER' | 'BUSKER';
  parentCommentId?: string;
}

export interface CommentLikeResponse {
  commentId: string;
  likerUuid: string;
  liked: boolean;
  createdAt: string;
}

/**
 * 댓글에 좋아요를 토글합니다. 좋아요가 없으면 추가하고, 있으면 제거합니다.
 */
export async function toggleCommentLike(
  requestData: CommentLikeRequest
): Promise<CommonResponseType<CommentLikeResponse>> {
  try {
    const url = '/like-service/api/v1/like/comment';
    
    console.log('=== Comment Like Request ===');
    console.log('URL:', url);
    console.log('Request Data:', requestData);
    
    const response = await instance.post<CommentLikeResponse>(
      url,
      {
        requireAuth: true,
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('=== Comment Like Response ===');
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error toggling comment like:', error);
    return {
      httpStatus: 'INTERNAL_SERVER_ERROR',
      isSuccess: false,
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다',
      code: 500,
      result: null as unknown as CommentLikeResponse,
    };
  }
}

// 피드 좋아요 인터페이스
export interface FeedLikeRequest {
  feedId: string;
  feedType: 'REELS' | 'POST' | 'LIVE';
  likerUuid: string;
  likerType: 'USER' | 'BUSKER';
}

export interface FeedLikeResponse {
  feedId: string;
  likerUuid: string;
  liked: boolean;
  createdAt: string;
}

/**
 * 피드에 좋아요를 토글합니다. 좋아요가 없으면 추가하고, 있으면 제거합니다.
 */
export async function toggleFeedLike(
  requestData: FeedLikeRequest
): Promise<CommonResponseType<FeedLikeResponse>> {
  try {
    const url = '/like-service/api/v1/like/feed';
    
    console.log('=== Feed Like Request ===');
    console.log('URL:', url);
    console.log('Request Data:', requestData);
    
    const response = await instance.post<FeedLikeResponse>(
      url,
      {
        requireAuth: true,
        body: JSON.stringify({
          feedId: requestData.feedId,
          feedType: requestData.feedType,
          likerUuid: requestData.likerUuid,
          likerType: requestData.likerType
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('=== Feed Like Response ===');
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error toggling feed like:', error);
    return {
      httpStatus: 'INTERNAL_SERVER_ERROR',
      isSuccess: false,
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다',
      code: 500,
      result: null as unknown as FeedLikeResponse,
    };
  }
}
