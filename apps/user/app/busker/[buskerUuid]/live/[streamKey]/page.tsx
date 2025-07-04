import { UseChat } from '@/context/ChatContext';
import ChatBar from '@/components/common/form/ChatBar';
import BuskerInfoBox from '@/components/live/BuskerInfoBox';
import LiveVideoPlayer from '@/components/live/LiveVideoPlayer';

import { BuskerLiveData } from '@/data/profileData';
import { getHlsStreamUrl } from '@/constants/streamConfig';

export default async function Page({ params }: { params: Promise<{ streamKey: string; buskerUuid: string }> }) {
  const data = BuskerLiveData;
  const resolvedParams = await params;
  const { streamKey } = resolvedParams;
  const streamUrl = getHlsStreamUrl(streamKey);

  return (
    <main className="relative h-screen overflow-hidden text-white font-poppins">
      {/* 비디오 플레이어가 배경으로 전체 화면 차지 */}
      <div className="absolute inset-0 w-full h-screen z-0">
        <LiveVideoPlayer streamUrl={streamUrl} className="w-full h-full object-cover" />
      </div>
      
      {/* 오버레이 - 비디오 위에 표시될 컨텐츠 */}
      <div className="relative z-10 h-full px-4 flex flex-col justify-between">
        <div className="pt-20">
          <BuskerInfoBox data={data} />
        </div>
        <div className="pb-4">
          <UseChat>
            <ChatBar />
          </UseChat>
        </div>
      </div>
    </main>
  );
}
