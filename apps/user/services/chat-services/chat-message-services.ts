'use server';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { instance } from '@/utils/requestHandler';
import { 
  SendMessageRequest,
  CommonResponseType,
  ChatMessageListType
} from '@/types/ResponseDataTypes';

// 메시지 전송 API
export async function sendMessage(
  messageData: SendMessageRequest
): Promise<CommonResponseType<object>> {
  try {
    const response = await instance.post<object>(
      '/chat-service/api/v1/chat-message',
      {
        body: JSON.stringify(messageData),
        requireAuth: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response;
  } catch (error) {
    console.error('메시지 전송 중 오류가 발생했습니다:', error);
    throw error;
  }
}

// 채팅방 메시지 조회 API (페이지네이션 지원)
export async function searchChatMessages(
  chatRoomId: string,
  cursor?: string,
  size = 20
): Promise<CommonResponseType<ChatMessageListType>> {
  try {
    const queryParams = new URLSearchParams({
      chatRoomId,
      size: size.toString(),
    });

    if (cursor) {
      queryParams.append('cursor', cursor);
    }

    const response = await instance.get<ChatMessageListType>(
      `/chat-service/api/v1/chat-message/search?${queryParams.toString()}`,
      {
        requireAuth: true,
      }
    );

    return response;
  } catch (error) {
    console.error('채팅 메시지 조회 중 오류가 발생했습니다:', error);
    throw error;
  }
}

// 실시간 채팅방 메시지 구독 API
export async function subscribeChatMessages(chatRoomId: string) {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.accessToken) {
      throw new Error('인증이 필요합니다.');
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat-service/api/v1/chat-message/subscribe?chatRoomId=${chatRoomId}`,
      {
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`,
          'Accept': 'text/event-stream',
        },
      }
    );

    if (!response.ok) {
      throw new Error('구독 요청이 실패했습니다.');
    }

    return response;
  } catch (error) {
    console.error('채팅 메시지 구독 중 오류가 발생했습니다:', error);
    throw error;
  }
}
