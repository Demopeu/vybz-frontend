'use client';

import { createContext, useState } from 'react';
import { ChatRoomContextType } from '@/types/ContextTypes';

export const ChatRoomContext = createContext<ChatRoomContextType>(
  {} as ChatRoomContextType
);

export function UseChatRoom({ children }: { children: React.ReactNode }) {
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const [userUuid, setUserUuid] = useState<string | null>(null);

  const value = {
    chatRoomId,
    setChatRoomId,
    userUuid,
    setUserUuid,
  };

  return <ChatRoomContext value={value}>{children}</ChatRoomContext>;
}
