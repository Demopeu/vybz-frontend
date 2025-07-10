export type CommonResponseType<T> = {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  code: number;
  result: T;
};

export type UserDataType = {
  accessToken: string;
  refreshToken: string;
  name: string;
  userUuid: string;
};

export type LoginArticleDataType = {
  title: string;
  views: string;
  description: string;
  hashtags: string[];
  cta: string;
};

export type VideoCarouselDataType = {
  id: string;
  videoSrc: string;
  thumbnailSrc: string;
};

export type CategoryDataType = {
  id: number;
  name: string;
};

export type ProfileDataType = {
  id: string;
  nickname: string;
  introduction: string;
  profileImage: string;
};

export type SearchResult = {
  id: number;
  title: string;
  buskerName: string;
  buskerUrl: string;
};

export type RecentSearchItem = {
  id: number;
  title: string;
};

export type SubscriptionType = {
  id: string;
  name: string;
  months: number;
  avatarUrl: string;
  subscribedSince: string;
};

export type BuskerLiveDataType = {
  buskerId: string;
  buskerName: string;
  liveLikeCount: number;
  liveName: string;
  buskerProfileImage: string;
  liveViews: number;
};

export type ReelsUrlDataType = {
  realsId: string;
  realsUrl: string;
  realsThumbnailUrl: string;
  realsDescription: string;
  realsLikeCount: number;
  realsCommentCount: number;
  buskerId: string;
  buskerName: string;
  buskerProfileImage: string;
};

export type CommentDataType = {
  id: number;
  username: string;
  avatarUrl: string;
  text: string;
  timeAgo: string;
  likes: number;
};

export type FanFeedDataType = {
  id: string;
  buskerName: string;
  buskerProfileImage: string;
  timeAgo: string;
  content?: string;
  imageSrcList?: string[];
  likesCount: number;
  commentsCount: number;
  realsId?: string;
};

export type FollowingDataType = {
  buskerUuid: string;
  nickname: string;
  profileImageUrl: string;
};

export type FollowingsResponseDataType = {
  content: FollowingDataType[];
  nextCursor: string | null;
  hasNext: boolean;
  pageSize: number;
  page: number;
};

export type UserInfoDataType = {
  nickname: string;
  profileImageUrl: string;
  followingCount: number;
  subscriptionCount: number;
  subscribeCount?: number; // 호환성을 위해 추가
  vticketCount: number;
};

export interface OtherUserDataType extends UserInfoDataType {
  buskerName: string;
  buskerProfileImage: string;
  createdAt: string;
  subscribeCount?: number; // 호환성을 위해 추가
}

export type PurchaseHistoryDataType = {
  id: string;
  date: string;
  vticketCount: number;
  amount: number;
};

export type UseHistoryDataType = {
  id: string;
  date: string;
  vticketCount: number;
  buskerName: string;
  buskerProfileImage: string;
  buskerUuid: string;
  message: string;
};

export type NotificationDataType = {
  id: string;
  date: string;
  buskerName: string;
  buskerProfileImage: string;
  buskerUuid: string;
  feedId: string;
  message: string;
};

export type ChatListType = {
  chatId: string;
  buskerName: string;
  buskerProfileImage: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

export type ChatListDataType = {
  data: ChatListType[] | [];
  page: number;
  totalPages: number;
};

export type ChatMessageType = {
  id: string;
  senderUuid: string;
  messageType: 'TEXT' | 'VIDEO' | 'IMAGE';
  content: string;
  read: boolean;
  sentAt: string;
  isTemporary?: boolean; // 로컬 임시 메시지 표시용
};

export type ChatMessageListType = {
  content: ChatMessageType[];
  nextCursor: string | null;
  hasNext: boolean;
  pageSize: number;
};

export type ChatRoomParticipantType = {
  participantUuid: string;
  unreadCount: number;
  hidden: boolean;
};

export type ChatRoomType = {
  chatRoomId: string;
  participant: ChatRoomParticipantType[];
  content: string;
  messageType: 'TEXT' | 'VIDEO' | 'IMAGE' | string;
  sentAt: string;
};

export interface SendMessageRequest {
  chatRoomId: string;
  senderUuid: string;
  receiverUuid: string;
  messageType: 'TEXT' | 'VIDEO' | 'IMAGE';
  content: string;
}

export type ChatRoomListResponseType = {
  content: ChatRoomType[];
  nextCursor: string;
  hasNext: boolean;
  pageSize: number;
};

export type BuskerInfoReadResponseType = {
  nickname: string;
  profileImageUrl: string;
  introduction: string;
  followerCount: number;
  displayFollowerCount: string;
  subscribedCount: number;
  followingCount: number;
  subscribeCount: number;
  vticketCount: number;
};

export type BuskerSNSListResponseType = CommonResponseType<{
  buskerUuid: string;
  snsUrl: string;
}>;

export type FollowCheckResponseType = CommonResponseType<boolean>;

export type BuskerSNSResponseType = {
  buskerUuid: string;
  snsUrl: string;
};

export type BuskerResponseType = {
  nickname: string;
  profileImageUrl: string;
  introduction: string;
  followerCount: number;
  displayFollowerCount: string;
  subscribedCount: number;
};

export type LiveStreamDataType = {
  id: string;
  buskerId: string;
  buskerName: string;
  liveName: string;
  buskerProfileImage: string;
  isMembership: boolean;
  viewerCount: number;
  startedAt: string;
  liveStreamStatus: string;
};

export type LiveStreamResponse = {
  content: {
    streamKey: string;
    title: string;
    buskerUuid: string | null;
    thumbnailUrl: string | null;
    viewerCount: number;
    liveStreamStatus: string;
    startedAt: string;
    membership: boolean;
  }[];
  hasNext: boolean;
  nextCursor: string | null;
};

export type MemberShipStatus = 'SUCCESS' | 'CANCELED';

export interface MemberShipType {
  userUuid: string;
  buskerUuid: string;
  price: number;
  memberShipStatus: MemberShipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ExtendedMemberShipType extends MemberShipType {
  buskerNickname: string;
  profileImageUrl: string;
  days: number;
  months: number;
  displayText: string;
}

export type PaymentResponseDataType = {
  checkoutUrl: string;
  orderId: string;
};

export type ResponseBillingKeyDto = {
  billingKey: string;
};

export type SubscriptionBillingResponse = {
  billingKey: string;
  customerKey: string;
  userUuid: string;
  buskerUuid: string;
  price: number;
};

export type PaymentHistoryItem = {
  amount: number;
  ticketCount: number;
  approvedAt: string;
  date?: string; // 호환성을 위해 추가
  vticketCount?: number; // 호환성을 위해 추가
  id?: string; // 호환성을 위해 추가
};

export type PaymentHistoryResponse = {
  type: string;
  dtoList: PaymentHistoryItem[];
  requestPageDTO: {
    page: number;
    size: number;
  };
  pageNumList: number[];
  totalCount: number;
  prev: boolean;
  next: boolean;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  current: number;
};

export type UseHistoryDataItem = {
  buskerUuid: string;
  nickname: string;
  profileImageUrl: string;
  ticketCount: number;
  message: string;
  donatedAt: string;
  date?: string; // 호환성을 위해 추가
  vticketCount?: number; // 호환성을 위해 추가
  amount?: number; // 호환성을 위해 추가
  approvedAt?: string; // 호환성을 위해 추가
  id?: string; // 호환성을 위해 추가
};

export type UseHistoryResponse = {
  type: string;
  dtoList: UseHistoryDataItem[];
  requestPageDTO: {
    page: number;
    size: number;
  };
  pageNumList: number[];
  totalCount: number;
  prev: boolean;
  next: boolean;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  current: number;
};

export type HistoryDataType = {
  type: 'purchase' | 'use';
  data: PaymentHistoryItem[] | UseHistoryDataItem[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
  pageNumList: number[];
  prev: boolean;
  next: boolean;
  prevPage: number;
  nextPage: number;
  currentPage: number;
};

export type UserInfoDataChatType = {
  nickname: string;
  profileImageUrl: string;
  followingCount: number;
  subscribeCount: number;
  vticketCount: number;
};
