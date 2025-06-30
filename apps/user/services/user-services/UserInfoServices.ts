import { UserInfoDataType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export async function getBuskerInfo(userUuid: string): Promise<UserInfoDataType> {
  try {
    const response = await instance.get<UserInfoDataType>(
      `/busker-info-read-service/api/v1/busker-info-read/${userUuid}`,
      {
        requireAuth: true,
      }
    );
    return response.result!;
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    return {
      nickname: '',
      profileImageUrl: '',
      followingCount: 0,
      subscribeCount: 0,
      vticketCount: 0,
    };
  }
}
