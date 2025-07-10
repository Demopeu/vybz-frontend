import FanFeedGrid from '@/components/mypage/Feed/FanFeedGrid';
import { fetchFanFeeds } from '@/services/fan-feed-services/fan-feed-services';
import { FanFeedDataType } from '@/types/ResponseDataTypes';

// Next.js 15 버전에 맞게 params와 searchParams를 Promise로 받음
type Props = {
  params: Promise<{ buskerUuid: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const { buskerUuid } = resolvedParams;

  // 팬 피드 데이터 가져오기
  const fanFeedData: FanFeedDataType[] = await fetchFanFeeds(
    10,
    undefined,
    'LATEST',
    buskerUuid
  );

  console.log(fanFeedData);

  return (
    <>
      <FanFeedGrid initialFeeds={fanFeedData} />
    </>
  );
}
