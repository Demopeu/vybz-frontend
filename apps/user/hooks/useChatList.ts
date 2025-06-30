import { useState, useCallback } from 'react';
import { getChatList } from '../services/chat-services/chat-list-services';
import { ChatRoomListResponseType } from '@/types/ResponseDataTypes';

export const useChatList = () => {
  const [data, setData] = useState<ChatRoomListResponseType['content']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState<string>('');

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getChatList(page);
      
      setData(prevData => [...prevData, ...response.content]);
      setHasMore(response.hasNext);
      setPage(response.nextCursor || page);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch chat list'));
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  const refresh = useCallback(async () => {
    setPage('');
    setHasMore(true);
    setData([]);
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getChatList();
      
      setData(response.content);
      setHasMore(response.hasNext);
      setPage(response.nextCursor || '');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh chat list'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
