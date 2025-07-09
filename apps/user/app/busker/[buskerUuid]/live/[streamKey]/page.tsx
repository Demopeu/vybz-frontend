import { UseChat } from '@/context/ChatContext';
import ChatBar from '@/components/common/form/ChatBar';
import BuskerInfoBox from '@/components/live/BuskerInfoBox';
import LiveVideoPlayer from '@/components/live/LiveVideoPlayer';
import { getBuskerInfo } from '@/services/user-services/UserInfoServices';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Page({
  params,
}: {
  params: Promise<{ streamKey: string; buskerUuid: string }>;
}) {
  const resolvedParams = await params;
  const { streamKey, buskerUuid } = resolvedParams;
  const buskerInfo = await getBuskerInfo(buskerUuid);
  const session = await getServerSession(options);
  const userUuid = session?.user?.userUuid;
  const userAccessToken = session?.user?.accessToken;
  return (
    <main className="relative h-screen overflow-hidden text-white font-poppins">
      {/* 비디오 플레이어가 배경으로 전체 화면 차지 */}
      <div className="absolute inset-0 w-full h-screen z-0">
        <LiveVideoPlayer
          streamKey={streamKey}
          userUuid={userUuid}
          userAccessToken={userAccessToken}
          buskerUuid={buskerUuid}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 오버레이 - 비디오 위에 표시될 컨텐츠 */}
      <div className="relative z-10 h-full px-4 flex flex-col justify-between">
        <div className="pt-20">
          <BuskerInfoBox data={buskerInfo} />
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
