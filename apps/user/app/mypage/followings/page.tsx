import SearchBar from '@/components/common/form/SearchBar';
import FollowingList from '@/components/mypage/Followings/FollowingList';
import { followingData } from '@/data/MypageData';

export default function page() {
  return (
    <main className="pt-20 px-6 space-y-10">
      <SearchBar placeholder="검색" />
      <FollowingList data={followingData} />
    </main>
  );
}
