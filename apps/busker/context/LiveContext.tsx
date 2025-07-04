'use client';

import { createContext, useState, useCallback } from 'react';
import { LiveContextType } from '@/types/ContextTypes';

export const LiveContext = createContext<LiveContextType>(
  {} as LiveContextType
);

export function UseLive({ children }: { children: React.ReactNode }) {
  const [isLive, setIsLive] = useState(false);
  const [title, setTitle] = useState('');
  const [streamKey, setStreamKey] = useState<string | null>(null);

  const toggleIsLive = useCallback(() => setIsLive((prev) => !prev), []);

  const value = {
    isLive,
    toggleIsLive,
    title,
    setTitle,
    streamKey,
    setStreamKey,
  };

  return <LiveContext.Provider value={value}>{children}</LiveContext.Provider>;
}
