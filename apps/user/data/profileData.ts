import { ProfileDataType, SearchResult, RecentSearchItem } from '@/types/ResponseDataTypes';

export const ProfileData: ProfileDataType = {
  id: 'user_123456',
  nickname: '카리나',
  introduction: '안녕하세요. 카리나입니다',
  profileImage: '/buskerUrl.jpg',
};

export const SearchResultsData: SearchResult[] = [
  {
    id: 1,
    title: '카리나',
    buskerName: '카리나',
    buskerUrl: '/buskerUrl.jpg',
  },
  {
    id: 2,
    title: '이지은',
    buskerName: '이지은',
    buskerUrl: '/buskerUrl.jpg',
  },
  {
    id: 3,
    title: '윈터',
    buskerName: '윈터',
    buskerUrl: '/buskerUrl.jpg',
  },
];

export const RecentSearchesData: RecentSearchItem[] = [
  { id: 1, title: '카리나' },
  { id: 2, title: '이지은' },
  { id: 3, title: '윈터' },
];
