'use client';

import { createContext, useState, useCallback } from 'react';
import { LiveContextType } from '@/types/ContextTypes';

export const LiveContext = createContext<LiveContextType>(
  {} as LiveContextType
);

export function UseLive({ children }: { children: React.ReactNode }) {
  const [isLive, setIsLive] = useState(false);
  const [title, setTitle] = useState('');

  const toggleIsLive = useCallback(() => setIsLive((prev) => !prev), []);

  const value = {
    isLive,
    toggleIsLive,
    title,
    setTitle,
  };

  return <LiveContext value={value}>{children}</LiveContext>;
}
