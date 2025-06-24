'use server';
import {
  BuskerInfoReadResponseType,
  BuskerCategoryResponseType,
  BuskerSNSResponseType,
  BuskerUpdateProfileResponseType,
  BuskerUpdateSNSResponseType,
} from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export async function BuskerInfoReadService(
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

export async function BuskerCategoryReadService(
  buskerUuid: string
): Promise<BuskerCategoryResponseType[]> {
  const response = await instance.get<BuskerCategoryResponseType[]>(
    `/busker-info-service/api/v1/busker-category/list/${buskerUuid}`,
    {
      requireAuth: true,
    }
  );
  return response.result;
}

export async function BuskerSNSService(
  buskerUuid: string
): Promise<BuskerSNSResponseType[]> {
  const response = await instance.get<BuskerSNSResponseType[]>(
    `/busker-info-service/api/v1/busker-sns/list/${buskerUuid}`,
    {
      requireAuth: true,
    }
  );
  return response.result;
}

export async function updateProfile(buskerUuid: string, formData: FormData) {
  const keysToDelete = Array.from(formData.keys()).filter(
    (key) => key.startsWith('$ACTION_') || key === '$ACTION_REF_1'
  );
  keysToDelete.forEach((key) => formData.delete(key));
  formData.append('buskerUuid', buskerUuid);
  console.log(formData);
  const response = await instance.put<BuskerUpdateProfileResponseType>(
    `/busker-info-service/api/v1/busker`,
    {
      body: formData,
      requireAuth: true,
    }
  );
  return response.result;
}
export async function updateSNS(buskerUuid: string, formData: FormData) {
  const keysToDelete = Array.from(formData.keys()).filter(
    (key) => key.startsWith('$ACTION_') || key === '$ACTION_REF_1'
  );
  keysToDelete.forEach((key) => formData.delete(key));
  formData.append('buskerUuid', buskerUuid);
  console.log(formData);
  const response = await instance.put<BuskerUpdateSNSResponseType>(
    `/busker-info-service/api/v1/busker-sns`,
    {
      body: formData,
      requireAuth: true,
    }
  );
  return response.result;
}
