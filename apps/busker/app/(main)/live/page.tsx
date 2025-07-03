import LiveHeader from '@/components/live/LiveHeader';
import LiveStream from '@/components/live/LiveStream';
import LiveInfo from '@/components/live/LiveInfo';
import LiveChat from '@/components/live/LiveChat';
import { currentLiveStream } from '@/data/live-dummy-data';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { BuskerInfoReadService } from '@/services/info-services/BuskerInfoReadService';
import { UseLive } from '@/context/LiveContext';

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

        {/* Main Content */}
        <section className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Video Section */}
            <div className="lg:col-span-2">
              <LiveStream liveData={currentLiveStream} />
              <LiveInfo />
            </div>

            {/* Chat Section */}
            <div className="lg:col-span-1">
              <LiveChat />
            </div>
          </div>
        </section>
      </UseLive>
    </div>
  );
}
