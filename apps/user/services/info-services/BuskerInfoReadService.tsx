'use server';
import { BuskerResponseType } from '@/types/ResponseDataTypes';
import { instance } from '@/utils/requestHandler';

export async function BuskerInfoReadService(
  buskerUuid: string
): Promise<BuskerResponseType> {
  const response = await instance.get<BuskerResponseType>(
    `/busker-info-read-service/api/v1/busker-info-read/${buskerUuid}`,
    {
      requireAuth: true,
    }
  );
  return response.result;
}

// 여러 버스커 정보를 가져오는 함수
export async function fetchMultipleBuskerInfo(
  buskerUuids: (string | null)[]
): Promise<{ [key: string]: BuskerResponseType }> {
  const validUuids = buskerUuids.filter((uuid): uuid is string => uuid !== null);
  
  if (validUuids.length === 0) {
    return {};
  }

  // 중복 제거
  const uniqueUuids = [...new Set(validUuids)];
  
  // 모든 버스커 정보 요청을 병렬로 처리
  const buskerInfoPromises = uniqueUuids.map(uuid => 
    BuskerInfoReadService(uuid)
      .catch(error => {
        console.error(`Error fetching info for busker ${uuid}:`, error);
        return null;
      })
  );

  const buskerInfoResults = await Promise.all(buskerInfoPromises);
  
  // 결과를 uuid를 키로 하는 객체로 변환
  const buskerInfoMap: { [key: string]: BuskerResponseType } = {};
  uniqueUuids.forEach((uuid, index) => {
    const result = buskerInfoResults[index];
    if (result) {
      buskerInfoMap[uuid] = result;
    }
  });

  return buskerInfoMap;
}
