import { BackgroundWrapper } from '@/components/busker/about/BackgroundWrapper';
import { BuskerProfileBox } from '@/components/busker/about/BuskerProfileBox';
import { BuskerTabs } from '@/components/busker/BuskerTabs';
import {
  getBuskerInfo,
  checkFollowStatus,
} from '@/services/user-services/UserInfoServices';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ buskerUuid: string }>;
}) {
  const { buskerUuid } = await params;
  const session = await getServerSession(options);
  const [initialData, isFollowing] = await Promise.all([
    getBuskerInfo(buskerUuid),
    session?.user?.userUuid
      ? checkFollowStatus(session.user.userUuid, buskerUuid)
      : Promise.resolve(false),
  ]);
  return (
    <>
      <div className="bg-gray-800 rounded-2xl h-full overflow-hidden relative pt-16">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-700">
          <BackgroundWrapper
            buskerProfileUrl={
              initialData.profileImageUrl || '/defaultProfile.png'
            }
          >
            <div className="absolute bottom-6 left-6 right-6">
              <BuskerProfileBox
                artistName={initialData.nickname}
                buskerProfileUrl={initialData.profileImageUrl}
                isFollowing={isFollowing}
                buskerUuid={buskerUuid}
                user={
                  session?.user
                    ? {
                        userUuid: session.user.userUuid,
                        name: session.user.name || '',
                        image: session.user.image || '',
                      }
                    : undefined
                }
              />
            </div>
          </BackgroundWrapper>
          <BuskerTabs buskerUuid={buskerUuid} />
          {children}
        </div>
      </div>
    </>
  );
}
