import { ChatListDataType } from '@/types/ResponseDataTypes';

export async function getChatList(
  page: number = 1,
  pageSize: number = 10
): Promise<ChatListDataType> {
  // TODO: Implement actual API call
  // This is a mock implementation
  return {
    data: [],
    page,
    totalPages: 0,
  };
}
