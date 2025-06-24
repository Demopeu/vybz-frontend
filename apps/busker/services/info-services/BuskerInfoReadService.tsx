'use server';
import { BuskerInfoReadResponseType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export default async function BuskerInfoReadService(
  buskerUuid: string
): Promise<BuskerInfoReadResponseType> {
  const response = await instance.get<BuskerInfoReadResponseType>(
    `/busker-info-read-service/api/v1/busker-info-read/${buskerUuid}`,
    {
      requireAuth: true,
    }
  );
  return response.result;
}
