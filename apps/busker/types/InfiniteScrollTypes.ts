export interface InfiniteScrollProps {
  children: React.ReactNode;
  hasNextPage: boolean;
  isLoading: boolean;
  fetchMore: () => void;
}
