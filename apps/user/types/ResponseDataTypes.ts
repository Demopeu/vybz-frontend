export interface CommonResponseType<T> {
  httpStatus: string;
  isSuccess: boolean;
  message: string;
  code: number;
  result: T;
}

export interface UserDataType {
  accessToken: string;
  refreshToken: string;
  name: string;
  userUuid: string;
}

export interface LoginArticleDataType {
  title: string;
  views: string;
  description: string;
  hashtags: string[];
  cta: string;
}