import UserProfile from '@/components/mypage/UserProfile';
import Vticket from '@/components/mypage/Vticket';
import MypageButtonBox from '@/components/mypage/MypageButtonBox';
import FanFeedSection from '@/components/mypage/Feed/FanFeedSection';
import { UseModal } from '@/context/ModalContext';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';
import { CommentsData } from '@/data/CommentData';

import { FanFeedData } from '@/data/FanFeedData';

export default function page() {
  return (
    <main>
      <UserProfile />
      <Vticket />
      <MypageButtonBox />
      <UseModal>
        <CommentDrawer commentData={CommentsData}>
          <FanFeedSection initialFeeds={FanFeedData} />
        </CommentDrawer>
      </UseModal>
    </main>
  );
}
