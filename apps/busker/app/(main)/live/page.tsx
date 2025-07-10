import LiveHeader from '@/components/live/LiveHeader';
import LiveChat from '@/components/live/LiveChat';
import { currentLiveStream } from '@/data/live-dummy-data';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { BuskerInfoReadService } from '@/services/info-services/BuskerInfoReadService';
import { UseLive } from '@/context/LiveContext';
import LiveStreamController from '@/components/live/LiveStreamController';

export default async function LivePage() {
  const session = await getServerSession(options);
  const buskerUuid = session?.user?.buskerUuid;
  const buskerInfo = await BuskerInfoReadService(buskerUuid || '');
  return (
    <div className="min-h-screen bg-div-background text-white">
      <UseLive>
        <LiveHeader
          buskerInfo={buskerInfo}
          viewerCount={currentLiveStream.viewerCount}
        />
        <section className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LiveStreamController
                buskerUuid={buskerUuid || ''}
                buskerAccessToken={session?.user?.accessToken || ''}
                viewerCount={currentLiveStream.viewerCount}
                likeCount={currentLiveStream.likeCount}
              />
            </div>
            <div className="lg:col-span-1">
              <LiveChat
                buskerUuid={buskerUuid || ''}
                nickname={buskerInfo.nickname}
              />
            </div>
          </div>
        </section>
      </UseLive>
    </div>
  );
}
