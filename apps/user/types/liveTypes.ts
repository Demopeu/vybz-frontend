export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isSupporter?: boolean;
}

export interface LiveChatBarProps {
  streamKey: string;
  userUuid: string;
  nickname: string;
  className?: string;
}
