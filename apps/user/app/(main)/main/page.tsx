import FullscreenSwiper from '@/components/common/swiper/FullscreenSwiper';
import CategoryBar from '@/components/common/navbar/CategoryBar';
import LiveFreeViewSection from '@/components/main/LiveFreeViewSection';

import { CategoryData } from '@/data/categoryData';
import { getReelsVideos } from '@/services/reels-services/reels-services';
import { getLiveStreams } from '@/services/live-services/live-services';
import { BuskerInfoReadService } from '@/services/info-services/BuskerInfoReadService';
import { BuskerResponseType } from '@/types/ResponseDataTypes';

export default async function page() {
  const DummyCategoryData = CategoryData;
  const LiveFreeViewData = await getLiveStreams(10);
  console.log(LiveFreeViewData);
  // 라이브 스트림 데이터에서 버스커 UUID 추출
  const buskerUuids = LiveFreeViewData.map((item) => item.buskerUuid).filter((uuid): uuid is string => uuid !== null);

  // 각 버스커 정보를 개별적으로 요청하고 Promise.allSettled로 결과 처리
  const buskerInfoPromises = buskerUuids.map(uuid => 
    BuskerInfoReadService(uuid)
  );

  // Promise.allSettled를 사용하여 모든 요청(성공/실패)의 결과 처리
  const buskerInfoResults = await Promise.allSettled(buskerInfoPromises);

  // 결과를 UUID를 키로 하는 객체로 변환
  const buskerInfoMap: { [key: string]: BuskerResponseType } = {};
  buskerUuids.forEach((uuid, index) => {
    const result = buskerInfoResults[index];
    if (result && result.status === 'fulfilled') {
      buskerInfoMap[uuid] = result.value;
    } else if (result && result.status === 'rejected') {
      console.error(`버스커 정보 조회 실패 (${uuid}):`, result.reason);
    }
  });

  // 성공/실패 비율 로깅
  const successCount = Object.keys(buskerInfoMap).length;
  const totalCount = buskerUuids.length;
  console.log(`버스커 정보 조회: ${successCount}/${totalCount} 성공`);

  // 라이브 스트림 데이터에 버스커 닉네임 정보 추가
  const enrichedLiveData = LiveFreeViewData.map((item) => {
    const uuid = item.buskerUuid;
    const nickname = 
      uuid && buskerInfoMap[uuid] ? buskerInfoMap[uuid].nickname : '익명';

    return {
      ...item,
      buskerNickname: nickname,
    };
  });

  const ReelsData = await getReelsVideos(10);

  return (
    <main>
      <FullscreenSwiper data={ReelsData} />
      <CategoryBar
        categories={DummyCategoryData}
        className="absolute top-140 left-0 right-0 z-20 px-6"
      />
      <LiveFreeViewSection data={enrichedLiveData} />
    </main>
  );
}
