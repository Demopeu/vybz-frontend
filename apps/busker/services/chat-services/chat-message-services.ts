'use server';

import { CommonResponseType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

// 메시지 전송 요청 타입
export interface SendMessageRequest {
  chatRoomId: string;
  senderUuid: string;
  receiverUuid: string;
  messageType: 'TEXT' | 'VIDEO' | 'IMAGE';
  content: string;
}

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