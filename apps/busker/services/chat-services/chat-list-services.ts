'use server';

import { ChatRoomListResponseType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export async function getChatList(
  sentAt?: string,
): Promise<ChatRoomListResponseType> {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.buskerUuid) {
      throw new Error('사용자 정보를 가져올 수 없습니다.');
    }
    
    const queryParams = new URLSearchParams();
    if (sentAt) {
      queryParams.append('sentAt', sentAt);
    }

    const response = await instance.get<ChatRoomListResponseType>(
      `/chat-service/api/v1/chat-room/search?participantUuid=${session.user.buskerUuid}${queryParams.toString() ? `&${queryParams.toString()}` : ''}`,
      {
        requireAuth: true,
      }
    );

    return response.result;
  } catch (error) {
    console.error('채팅 목록을 불러오는 중 오류가 발생했습니다:', error);
    throw error;
  }
}
