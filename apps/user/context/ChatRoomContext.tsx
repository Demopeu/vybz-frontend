'use client';

import { createContext, useState, useCallback } from 'react';
import { ChatRoomContextType } from '@/types/ContextTypes';
import { ChatMessageType } from '@/types/ResponseDataTypes';

export const ChatRoomContext = createContext<ChatRoomContextType>(
  {} as ChatRoomContextType
);

export function UseChatRoom({ children }: { children: React.ReactNode }) {
  const [buskerUuid, setBuskerUuid] = useState<string | null>(null);
  const [userUuid, setUserUuid] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const addMessage = useCallback((newMessage: ChatMessageType) => {
    setMessages((prevMessages) => {
      // 중복 메시지 체크 (ID 또는 content + sentAt 조합으로)
      const isDuplicate = prevMessages.some(
        (msg) => 
          msg.id === newMessage.id || 
          (msg.content === newMessage.content && 
           msg.senderUuid === newMessage.senderUuid &&
           Math.abs(new Date(msg.sentAt).getTime() - new Date(newMessage.sentAt).getTime()) < 1000)
      );
      
      if (isDuplicate) {
        return prevMessages;
      }
      
      return [newMessage, ...prevMessages];
    });
  }, []);

  const addMessages = useCallback((newMessages: ChatMessageType[]) => {
    setMessages((prevMessages) => [...newMessages, ...prevMessages]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = {
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
