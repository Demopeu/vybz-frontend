'use server';

import { FollowingsResponseDataType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export const getFollowingsUsers = async (
    userUuid: string,
    page?: number,
    pageSize?: number
  ): Promise<FollowingsResponseDataType> => {
    try {
      const params = new URLSearchParams();
      params.append('userUuid', userUuid);
      if (page !== undefined) params.append('page', page.toString());
      if (pageSize !== undefined) params.append('pageSize', pageSize.toString());
  
      const query = params.toString();
      const url = `/follow-service/api/v1/follow/following-list?${query}`;
      const response = await instance.get<FollowingsResponseDataType>(url);
  
      return response.result!;
    } catch (error) {
      console.error('Error in getFollowingsUsers:', error);
      return {
        content: [],
        nextCursor: null,
        hasNext: false,
        pageSize: pageSize ?? 10,
        page: page ?? 1,
      };
    }
  };
  