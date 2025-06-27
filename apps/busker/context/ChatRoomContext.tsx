'use client';

import { createContext, useState, useCallback } from 'react';
import { ChatRoomContextType } from '@/types/ContextTypes';
import { ChatMessageType } from '@/types/ResponseDataTypes';

export const ChatRoomContext = createContext<ChatRoomContextType>(
  {} as ChatRoomContextType
);

export function UseChatRoom({ children }: { children: React.ReactNode }) {
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [buskerUuid, setBuskerUuid] = useState<string | null>(null);
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const addMessage = useCallback((newMessage: ChatMessageType) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  }, []);

  const addMessages = useCallback((newMessages: ChatMessageType[]) => {
    setMessages((prevMessages) => [...newMessages, ...prevMessages]);
  }, []);
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = {
    chatRoomId,
    setChatRoomId,
    buskerUuid,
    setBuskerUuid,
    userUuid,
    setUserUuid,
    messages,
    addMessage,
    addMessages,
    clearMessages,
  };

  return <ChatRoomContext value={value}>{children}</ChatRoomContext>;
}
