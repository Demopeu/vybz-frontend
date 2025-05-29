import SearchBar from '@/components/common/form/SearchBar';
import RecentSearch from '@/components/search/RecentSearch';
import SuggestedSection from '@/components/search/SuggestedSection';

export default function page() {
  // 검색어 입력 후 query string(`?q=...`)으로 검색 결과 표시
  //결과는 실시간 fetch로 불러오며, 상태 관리는 zustand 사용
  return (
    <main className="min-h-screen px-4 pt-10 text-white font-poppins space-y-10">
      <SearchBar />
      <RecentSearch
        data={[
          {
            id: 1,
            title: '카리나',
          },
          {
            id: 2,
            title: '이지은',
          },
          {
            id: 3,
            title: '윈터',
          },
        ]}
      />
      <SuggestedSection
        data={[
          {
            id: 1,
            buskerName: '카리나',
            buskerUrl: '/logo/logo.png',
          },
          {
            id: 2,
            buskerName: '이지은',
            buskerUrl: '/logo/logo.png',
          },
          {
            id: 3,
            buskerName: '윈터',
            buskerUrl: '/logo/logo.png',
          },
          {
            id: 4,
            buskerName: '윈터',
            buskerUrl: '/logo/logo.png',
          },
          {
            id: 5,
            buskerName: '윈터',
            buskerUrl: '/logo/logo.png',
          },
          {
            id: 6,
            buskerName: '이지은',
            buskerUrl: '/logo/logo.png',
          },
        ]}
      />
    </main>
  );
}
