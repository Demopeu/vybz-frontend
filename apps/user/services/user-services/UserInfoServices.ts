import { BuskerInfoReadResponseType, BuskerSNSListResponseType, CommonResponseType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export async function getBuskerInfo(userUuid: string): Promise<BuskerInfoReadResponseType> {
  try {
    const response = await instance.get<BuskerInfoReadResponseType>(
      `/busker-info-read-service/api/v1/busker-info-read/${userUuid}`,
      {
        requireAuth: true,
      }
    );
    return response.result!;
  } catch (error) {
    console.error('Error in getBuskerInfo:', error);
    return {
      nickname: '',
      profileImageUrl: '',
      introduction: '',
      followerCount: 0,
      displayFollowerCount: '0',
      subscribedCount: 0,
      followingCount: 0,
      subscribeCount: 0,
      vticketCount: 0,
    };
  }
}


export async function getBuskerSNSList(userUuid: string): Promise<{ [key: string]: string }> {
  try {
    const response = await instance.get<BuskerSNSListResponseType>(
      `/busker-info-service/api/v1/busker-sns/list/${userUuid}`,
      {
        requireAuth: true,
      }
    );
    
    // SNS 타입별로 객체 변환
    const snsLinks: { [key: string]: string } = {};
    
    if (response.result && Array.isArray(response.result)) {
      response.result.forEach(sns => {
        const url = sns.snsUrl.toLowerCase();
        
        if (url.includes('instagram')) {
          snsLinks.instagram = sns.snsUrl;
        } else if (url.includes('youtube')) {
          snsLinks.youtube = sns.snsUrl;
        } else if (url.includes('tiktok')) {
          snsLinks.tiktok = sns.snsUrl;
        } else if (url.includes('soundcloud')) {
          snsLinks.soundcloud = sns.snsUrl;
        }
      });
    }
    
    return snsLinks;
  } catch (error) {
    console.error('Error in getBuskerSNSList:', error);
    return {};
  }
}

/**
 * 유저가 특정 버스커를 팔로우 중인지 확인하는 함수
 * @param userUuid 사용자 UUID
 * @param buskerUuid 버스커 UUID
 * @returns 팔로우 여부 (true: 팔로우 중, false: 팔로우하지 않음)
 */
export async function checkFollowStatus(userUuid: string, buskerUuid: string): Promise<boolean> {
  try {
    const response = await instance.get<CommonResponseType<boolean>>(
      `/follow-service/api/v1/follow/check?userUuid=${userUuid}&buskerUuid=${buskerUuid}`,
      { requireAuth: true }
    );
    return Boolean(response.result || false);
  } catch (error) {
    console.error('Error in checkFollowStatus:', error);
    return false;
  }
}

/**
 * 팔로우 추가 API
 * @param followerInfo 팔로우하는 사용자 정보
 * @param followingInfo 팔로우 대상 버스커 정보
 * @returns API 응답 결과
 */
export async function addFollow(
  followerInfo: { userUuid: string; nickname: string; profileImageUrl: string },
  followingInfo: { buskerUuid: string; nickname: string; profileImageUrl: string }
): Promise<boolean> {
  try {
    const response = await instance.post<CommonResponseType<Record<string, never>>>(
      '/follow-service/api/v1/follow',
      {
        body: JSON.stringify({
          follower: [followerInfo],
          following: [followingInfo],
        }),
        requireAuth: true
      }
    );
    return response.isSuccess || false;
  } catch (error) {
    console.error('Error in addFollow:', error);
    return false;
  }
}

/**
 * 팔로잉 삭제 API
 * @param userUuid 사용자 UUID
 * @param buskerUuid 버스커 UUID
 * @returns API 응답 결과
 */
export async function removeFollow(userUuid: string, buskerUuid: string): Promise<boolean> {
  try {
    const response = await instance.delete<CommonResponseType<Record<string, never>>>(
      '/follow-service/api/v1/follow',
      {
        body: JSON.stringify({ userUuid, buskerUuid }),
        requireAuth: true
      }
    );
    return response.isSuccess || false;
  } catch (error) {
    console.error('Error in removeFollow:', error);
    return false;
  }
}
