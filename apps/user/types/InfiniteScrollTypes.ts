export type InfiniteScrollProps = {
  children: React.ReactNode; // 보여줄내용
  hasNextPage: boolean; // 다음 페이지 있는지?
  isLoading: boolean; // 로딩 중인지?
  onIntersect: () => void; // 데이터 가져올때 쓸 함수
};
