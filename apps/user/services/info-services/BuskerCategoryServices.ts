import { instance } from "@/utils/requestHandler";

export interface BuskerCategory {
  buskerUuid: string;
  categoryId: number;
}

export interface BuskerCategoryResponse {
  isSuccess: boolean;
  message: string;
  code: number;
  result: BuskerCategory[];
}

export const getBuskerCategories = async (buskerUuid: string): Promise<BuskerCategoryResponse> => {
  return await instance.get(`/busker-info-service/api/v1/busker-category/list/${buskerUuid}`);
};
