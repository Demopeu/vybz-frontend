import { SNSLinkBox } from '@/components/busker/about/SNSLinkBox';
import { RecentBox } from '@/components/busker/about/RecentBox';
import { BuskerCategorySection } from '@/components/busker/BuskerCategorySection';
import { getBuskerSNSList } from '@/services/user-services/UserInfoServices';

export default async function Page({
  params,
}: {
  params: Promise<{ buskerUuid: string }>;
}) {
  const { buskerUuid } = await params;
  const [snsLinks] = await Promise.all([getBuskerSNSList(buskerUuid)]);
  return (
    <div className="bg-black p-6 space-y-6">
      <BuskerCategorySection buskerUuid={buskerUuid} />
      <SNSLinkBox links={snsLinks} />
      <RecentBox />
    </div>
  );
}
