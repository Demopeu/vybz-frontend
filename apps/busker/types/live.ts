export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isSupporter?: boolean;
}

export interface LiveStreamData {
  id: string;
  title: string;
  description: string;
  buskerName: string;
  buskerProfileImage: string;
  isLive: boolean;
  tags: string[];
  viewerCount: number;
  likeCount: number;
}
