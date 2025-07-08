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
      // 임시 메시지를 실제 메시지로 교체하는 로직
      const tempMessageIndex = prevMessages.findIndex((msg) => 
        msg.isTemporary && 
        msg.content === newMessage.content &&
        msg.senderUuid === newMessage.senderUuid &&
        Math.abs(new Date(msg.sentAt).getTime() - new Date(newMessage.sentAt).getTime()) < 10000 // 10초 이내
      );
      
      if (tempMessageIndex !== -1) {
        // 임시 메시지를 실제 메시지로 교체
        console.log('임시 메시지를 실제 메시지로 교체:', newMessage);
        const updatedMessages = [...prevMessages];
        updatedMessages[tempMessageIndex] = newMessage;
        return updatedMessages;
      }
      
      // 기존 메시지의 읽음 상태 업데이트 체크
      const existingMessageIndex = prevMessages.findIndex((msg) => msg.id === newMessage.id);
      
      if (existingMessageIndex !== -1) {
        // 기존 메시지가 있으면 읽음 상태만 업데이트
        console.log('기존 메시지 읽음 상태 업데이트:', newMessage);
        return prevMessages.map((msg, index) => 
          index === existingMessageIndex ? { ...msg, read: newMessage.read } : msg
        );
      }
      
      // 완전히 새로운 메시지인지 체크
      const isDuplicate = prevMessages.some((msg) => {
        // 로컬 임시 메시지와 SSE 실제 메시지 중복 체크
        // (같은 사용자가 같은 내용을 거의 동시에 보낸 경우)
        if (
          msg.content === newMessage.content &&
          msg.senderUuid === newMessage.senderUuid &&
          Math.abs(new Date(msg.sentAt).getTime() - new Date(newMessage.sentAt).getTime()) < 5000 // 5초 이내
        ) {
          return true;
        }
        
        return false;
      });
      
      if (isDuplicate) {
        console.log('중복 메시지 감지, 추가하지 않음:', newMessage);
        return prevMessages;
      }
      
      // 완전히 새로운 메시지 추가
      return [newMessage, ...prevMessages];
    });
  }, []);

  const addMessages = useCallback((newMessages: ChatMessageType[]) => {
    setMessages((prevMessages) => [...newMessages, ...prevMessages]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  // 메시지 읽음 상태 업데이트 함수
  const updateMessageReadStatus = useCallback((messageId: string, isRead: boolean) => {
    setMessages((prevMessages) => 
      prevMessages.map((msg) => 
        msg.id === messageId ? { ...msg, read: isRead } : msg
      )
    );
  }, []);

  // 여러 메시지의 읽음 상태를 한번에 업데이트
  const updateMultipleMessagesReadStatus = useCallback((messageIds: string[], isRead: boolean) => {
    setMessages((prevMessages) => 
      prevMessages.map((msg) => 
        messageIds.includes(msg.id) ? { ...msg, read: isRead } : msg
      )
    );
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
    updateMessageReadStatus,
    updateMultipleMessagesReadStatus,
  };

  return <ChatRoomContext value={value}>{children}</ChatRoomContext>;
}
