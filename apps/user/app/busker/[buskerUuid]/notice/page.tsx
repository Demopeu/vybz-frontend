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
  let fanFeedData: FanFeedDataType[] = [];
  try {
    fanFeedData = await fetchFanFeeds(10, undefined, 'LATEST', buskerUuid);
  } catch (error) {
    console.error('팬 피드 데이터 가져오기 실패:', error);
  }

  return (
    <>
      <FanFeedGrid initialFeeds={fanFeedData} />
    </>
  );
}
