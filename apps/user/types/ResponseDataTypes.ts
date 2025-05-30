export type CommonResponseType<T> = {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  code: number;
  result: T;
}

export type UserDataType = {
  accessToken: string;
  refreshToken: string;
  name: string;
  userUuid: string;
}

export type LoginArticleDataType = {
  title: string;
  views: string;
  description: string;
  hashtags: string[];
  cta: string;
}

export type VideoCarouselDataType = {
  id: string
  videoSrc: string
  thumbnailSrc: string
}

export type CategoryDataType = {
  id: string;
  name: string;
}

export type LiveFreeViewType = {
  id: string;
  buskerId: string;
  buskerName: string;
  liveName: string;
  buskerProfileImage: string;
  isMembership: boolean;
}

export type ProfileDataType = {
  id: string;
  nickname: string;
  introduction: string;
  profileImage: string;
}

export type SearchResult = {
  id: number;
  title: string;
  buskerName: string;
  buskerUrl: string;
}

export type RecentSearchItem = {
  id: number;
  title: string;
}

export type SubscriptionType = {
  id: string;
  name: string;
  months: number;
  avatarUrl: string;
  subscribedSince: string;
}