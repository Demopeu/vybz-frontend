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