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
  );

  // Promise.allSettled를 사용하여 모든 요청의 결과를 받음
  // 성공한 요청과 실패한 요청을 모두 처리
  const buskerInfoResults = await Promise.allSettled(buskerInfoPromises);
  
  // 결과를 uuid를 키로 하는 객체로 변환
  const buskerInfoMap: { [key: string]: BuskerResponseType } = {};
  uniqueUuids.forEach((uuid, index) => {
    const result = buskerInfoResults[index];
    if (result && result.status === 'fulfilled') {
      // 성공한 요청만 결과에 추가
      buskerInfoMap[uuid] = result.value;
    } else if (result && result.status === 'rejected') {
      // 실패한 요청 로그 출력
      console.error(`버스커 정보 조회 실패 (${uuid}):`, result.reason);
    }
  });
  
  // 성공 비율 로깅
  const successCount = Object.keys(buskerInfoMap).length;
  const totalCount = uniqueUuids.length;
  console.log(`버스커 정보 조회: ${successCount}/${totalCount} 성공`);

  return buskerInfoMap;
}
