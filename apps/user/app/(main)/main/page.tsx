import FullscreenSwiper from '@/components/common/swiper/FullscreenSwiper';
import CategoryBar from '@/components/common/navbar/CategoryBar';
import LiveFreeViewSection from '@/components/main/LiveFreeViewSection';

import { CategoryData } from '@/data/categoryData';
import { getReelsVideos } from '@/services/reels-services/reels-services';
import { getLiveStreams } from '@/services/live-services/live-services';
import { fetchMultipleBuskerInfo } from '@/services/info-services/BuskerInfoReadService';

export default async function page() {
  const DummyCategoryData = CategoryData;
  const LiveFreeViewData = await getLiveStreams(10);
  
  // 라이브 스트림 데이터에서 버스커 UUID 추출
  const buskerUuids = LiveFreeViewData.map(item => item.buskerUuid);
  
  // 여러 버스커 정보 한 번에 가져오기
  const buskerInfoMap = await fetchMultipleBuskerInfo(buskerUuids);
  
  // 라이브 스트림 데이터에 버스커 닉네임 정보 추가
  const enrichedLiveData = LiveFreeViewData.map(item => {
    const uuid = item.buskerUuid;
    const nickname = uuid && buskerInfoMap[uuid] ? buskerInfoMap[uuid].nickname : '익명';
    
    return {
      ...item,
      buskerNickname: nickname
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
