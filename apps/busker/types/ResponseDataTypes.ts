export type CommonResponseType<T> = {
    httpStatus: string;
    isSuccess: boolean;
    message: string;
    code: number;
    result: T;
  };

  export type CategoryDataType = {
    id: string;
    name: string;
  };

  export type BuskerDataType = {
    name: string;
    genre: string;
    description: string;
    profileImage: string;
  };