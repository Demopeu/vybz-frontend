export type InfiniteScrollProps = {
  children: React.ReactNode;
  hasNextPage: boolean;
  isLoading: boolean;
  onIntersect: () => void;
};
