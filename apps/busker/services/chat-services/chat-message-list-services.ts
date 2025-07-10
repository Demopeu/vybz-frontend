import {
  ChatMessageListType,
  CommonResponseType,
} from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

interface GetChatMessagesParams {
  chatRoomId: string;
  participantUuid: string;
  sentAt?: string;
  pageSize?: number;
}

export async function getChatMessages(
  params: GetChatMessagesParams
): Promise<CommonResponseType<ChatMessageListType>> {
  const { chatRoomId, participantUuid, sentAt, pageSize = 20 } = params;
  
  const queryParams = new URLSearchParams({
    chatRoomId,
    participantUuid,
    pageSize: pageSize.toString(),
  });
  
  if (sentAt) {
    queryParams.append('sentAt', sentAt);
  }
  
  const url = `/chat-service/api/v1/chat-message/search?${queryParams.toString()}`;
  
  return await instance.get<ChatMessageListType>(url, {
    requireAuth: true,
  });
}
