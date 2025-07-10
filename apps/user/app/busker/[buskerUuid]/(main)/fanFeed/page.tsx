import FanFeedSection from '@/components/mypage/Feed/FanFeedSection';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';
import { UseModal } from '@/context/ModalContext';
import { fetchFanFeeds } from '@/services/fan-feed-services/fan-feed-services';
import { FanFeedDataType } from '@/types/ResponseDataTypes';
import { CommentsData } from '@/data/CommentData';

interface PageProps {
  params: Promise<{
    buskerUuid: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NoticePage({ params }: PageProps) {
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
      <UseModal>
        <FanFeedSection initialFeeds={fanFeedData} />
        <CommentDrawer commentData={CommentsData} />
      </UseModal>
    </>
  );
}
