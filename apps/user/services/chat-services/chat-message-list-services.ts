import { ChatMessageListType, ChatMessageType } from '@/types/ResponseDataTypes';

const allMessages: ChatMessageType[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  senderUuid: i % 2 === 0 ? 'user-1' : 'user-2',
  messageType: 'TEXT',
  content: `더미 메시지 ${i + 1}`,
  read: true,
  sentAt: '2025-06-17 15:06:15',
}));

export async function getChatMessages(
  cursor: string | null,
  pageSize: number = 20
): Promise<{ data: ChatMessageListType }> {
  // 커서가 없으면 최신 메시지부터 시작
  const startIndex = cursor
    ? allMessages.findIndex((msg) => msg.id === cursor) + 1
    : 0;

  const pageMessages = allMessages.slice(startIndex, startIndex + pageSize);

  const nextCursor =
    startIndex + pageSize < allMessages.length
      ? pageMessages[pageMessages.length - 1]?.id ?? null
      : null;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          content: pageMessages,
          nextCursor,
          hasNext: nextCursor !== null,
          pageSize,
        },
      });
    }, 500); // 응답 지연 시뮬레이션
  });
}
