'use client';

import { useState, useEffect, useRef, useCallback, use } from 'react';
import { Client, Stomp } from '@stomp/stompjs';
import { cn } from '@repo/ui/lib/utils';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { Badge } from '@repo/ui/components/ui/badge';
import { ScrollArea } from '@repo/ui/components/ui/scrollarea';
import {
  SendHorizontal,
  Smile,
  MessageCircle,
} from '@repo/ui/components/icons';
import { ChatMessage, LiveChatBarProps } from '@/types/liveTypes';
import { ChatContext } from '@/context/ChatContext';
import Emojibox from '@/components/common/EmojiBox';
import { emojiData } from '@/data/EmojiData';

export default function LiveChatBar({
  streamKey,
  userUuid,
  nickname,
  className,
}: LiveChatBarProps) {
  const { showEmojibox, toggleShowEmojibox, comment, setComment } =
    use(ChatContext);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const maxReconnectAttempts = 5;
  const isConnectingRef = useRef(false);
  const currentClientRef = useRef<Client | null>(null);

  // 채팅 메시지 스크롤 to bottom
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // 채팅 WebSocket 연결
  const connectToChat = useCallback(async () => {
    if (!streamKey) {
      setError('스트림 키가 없어 채팅을 연결할 수 없습니다.');
      return;
    }

    if (isConnectingRef.current || connecting) {
      console.log('⚠️ 이미 연결 시도 중...');
      return;
    }

    console.log('💬 채팅 WebSocket 연결 시도...');
    isConnectingRef.current = true;
    setConnecting(true);
    setError(null);

    const socket = new WebSocket(
      `wss://back.vybz.kr/ws/live-chat?liveId=${streamKey}`
    );
    const client = Stomp.over(socket);

    client.debug = () => {};

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onclose = (event) => {
      console.log('🔌 WebSocket closed:', event.code);
      setConnected(false);
      setConnecting(false);
      isConnectingRef.current = false;

      if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
        setReconnectAttempts((prev) => prev + 1);
        setTimeout(() => {
          console.log('연결이 끊어져 재연결을 시도합니다...');
          if (!isConnectingRef.current) {
            connectToChat();
          }
        }, 2000);
      }
    };

    socket.onerror = (error: Event | string) => {
      console.error('🚨 WebSocket error:', error);
      setError('채팅 서버에 연결할 수 없습니다.');
      setConnected(false);
      setConnecting(false);
      isConnectingRef.current = false;
    };

    client.connect(
      {},
      // 연결 성공 콜백
      () => {
        console.log('✅ STOMP 연결 성공');
        setConnected(true);
        setConnecting(false);
        isConnectingRef.current = false;
        setReconnectAttempts(0);
        setError(null);

        // 기존 구독 정리 (중복 구독 방지)
        if (currentClientRef.current && currentClientRef.current.connected) {
          console.log('🗑️ 기존 구독 정리 중...');
          try {
            currentClientRef.current.deactivate();
          } catch (error) {
            console.error('기존 연결 정리 오류:', error);
          }
        }

        // 채팅 메시지 구독 (단일 구독만 유지)
        const subscription = client.subscribe(`/topic/live-chat/${streamKey}`, (message) => {
          console.log('💬 메시지 수신:', message.body);
          try {
            const messageBody = JSON.parse(message.body);
            const newMessage: ChatMessage = {
              id: messageBody.id || Date.now().toString(),
              username: messageBody.nickname || messageBody.senderUuid || '익명',
              message: messageBody.content || '',
              timestamp: new Date(messageBody.timestamp || Date.now()),
              isSupporter: false,
            };
            console.log('💬 새 메시지 추가:', newMessage);
            setChatMessages((prev) => {
              // 중복 메시지 방지
              const isDuplicate = prev.some(msg => 
                msg.id === newMessage.id || 
                (msg.message === newMessage.message && 
                 msg.username === newMessage.username &&
                 Math.abs(msg.timestamp.getTime() - newMessage.timestamp.getTime()) < 1000)
              );
              if (isDuplicate) {
                console.log('⚠️ 중복 메시지 방지:', newMessage);
                return prev;
              }
              return [...prev, newMessage];
            });
          } catch (error) {
            console.error('메시지 파싱 오류:', error);
          }
        });
        
        console.log('✅ 구독 완료:', subscription.id);

        setStompClient(client);
        currentClientRef.current = client;
      },
      // 연결 실패 콜백
      (error: ErrorEvent) => {
        console.error('❌ STOMP 연결 실패:', error);
        setError('채팅 서버 연결에 실패했습니다. 다시 시도해주세요.');
        setConnected(false);
        setConnecting(false);
        isConnectingRef.current = false;

        // 재연결 시도
        if (reconnectAttempts < maxReconnectAttempts) {
          setReconnectAttempts((prev) => prev + 1);
          setTimeout(() => {
            console.log('STOMP 연결 실패로 재연결을 시도합니다...');
            if (!isConnectingRef.current) {
              connectToChat();
            }
          }, 2000);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamKey]); // reconnectAttempts, connecting 제거로 무한 재연결 방지

  // 초기 연결 및 정리 - streamKey가 있을 때만 연결
  useEffect(() => {
    if (!streamKey) return;
    
    console.log('🔗 초기 WebSocket 연결 시도...');
    connectToChat();

    // 컴포넌트 언마운트 시 연결 정리
    return () => {
      console.log('🗑️ 컴포넌트 언마운트 - WebSocket 연결 정리 중...');
      if (currentClientRef.current) {
        try {
          currentClientRef.current.deactivate();
        } catch (error) {
          console.error('연결 정리 오류:', error);
        }
        currentClientRef.current = null;
      }
      setConnected(false);
      setConnecting(false);
      isConnectingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamKey]); // connectToChat 제거로 무한 루프 방지

  // 메시지 전송
  const handleSendMessage = async () => {
    if (isSending) return;

    if (!comment.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }

    if (!connected || !stompClient) {
      alert('채팅 서버에 연결되지 않았습니다.');
      return;
    }

    setIsSending(true);

    try {
      // busker 앱과 동일한 메세지 형식 사용
      const messageData = {
        senderUuid: userUuid || 'anonymous',
        nickname: nickname || '익명', // username 대신 nickname 필드 사용
        content: comment.trim(),   // message 대신 content 필드 사용
        timestamp: new Date().toISOString(),
      };

      stompClient.publish({
        destination: '/app/live-chat/sendMessage',
        body: JSON.stringify(messageData),
      });

      setComment('');
      console.log('메시지 전송 완료');
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      alert('메시지 전송에 실패했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  // 재연결
  const handleReconnect = () => {
    if (currentClientRef.current && currentClientRef.current.connected) {
      currentClientRef.current.deactivate();
    }
    setReconnectAttempts(0);
    connectToChat();
  };

  // 컴포넌트 마운트 시 자동 연결 및 언마운트 시 정리
  // 초기 연결 및 정리 useEffect에서만 처리하도록 통합
  /* 이 useEffect는 제거 - 중복 연결 방지 */

  // Enter 키 핸들러 - 어플리케이션 폼 제출과 충돌을 피하기 위해 수정
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter키를 누르면 폼 제출을 트리거하기만 하고, 직접 handleSendMessage는 호출하지 않음
    if (e.key === 'Enter' && !e.shiftKey && !isSending) {
      e.preventDefault();
      // 폼 태그를 찾아서 수동으로 제출
      const form = e.currentTarget.closest('form');
      if (form) form.requestSubmit();
    }
  };

  // 폼 제출 핸들러 - 메시지 전송을 여기서만 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className={cn('w-full z-50', className)}>
      {/* 채팅 토글 버튼 */}
      <div className="flex items-center justify-between p-2 bg-gray-900/30 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-300">
            라이브 채팅 ({chatMessages.length})
          </span>
          {connected ? (
            <Badge
              variant="outline"
              className="bg-green-600 text-white text-xs"
            >
              연결됨
            </Badge>
          ) : connecting ? (
            <Badge
              variant="outline"
              className="bg-yellow-600 text-white text-xs"
            >
              연결 중...
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-600 text-white text-xs">
              연결 끊김
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowChat(!showChat)}
          className="text-gray-400 hover:text-white"
        >
          {showChat ? '숨기기' : '보기'}
        </Button>
      </div>

      {/* 채팅 영역 */}
      {showChat && (
        <div className="bg-gray-900/30 backdrop-blur-md">
          {/* 에러 메시지 */}
          {error && (
            <div className="p-3 bg-red-800/30 text-red-200 text-sm">
              <div className="flex items-center justify-between">
                <span>{error}</span>
                {!connected && !connecting && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReconnect}
                    className="ml-2 h-6 text-xs"
                  >
                    재연결
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* 채팅 메시지 */}
          <ScrollArea className="h-64 p-3" type="always" ref={scrollAreaRef}>
            {chatMessages.length === 0 && !error ? (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                아직 채팅 메시지가 없습니다.
              </div>
            ) : (
              <div className="space-y-2">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm font-medium ${
                          msg.isSupporter ? 'text-yellow-400' : 'text-blue-400'
                        }`}
                      >
                        {msg.username}
                        {msg.isSupporter && ' 💎'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-200 break-words">
                      {msg.message}
                    </p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
          </ScrollArea>
        </div>
      )}

      {/* 채팅 입력 바 */}
      <div className="bg-gray-900/30 backdrop-blur-md">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-between px-4 py-2 w-full"
        >
          <label className="relative w-full pr-4" id="live-chat">
            <Button
              type="button"
              onClick={toggleShowEmojibox}
              className="absolute top-1/2 -translate-y-1/2 text-white z-10 w-12 h-12 border-none bg-transparent hover:bg-transparent [&_svg]:size-6"
            >
              <Smile />
            </Button>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                connected
                  ? '라이브 채팅에 참여하세요'
                  : '채팅 서버에 연결 중...'
              }
              disabled={!connected}
              className="text-white border-none bg-gray-400/30 backdrop-blur-md h-12 py-0 !pl-12 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </label>
          <Button
            type="submit"
            size="icon"
            disabled={!connected || !comment.trim() || isSending}
            className="w-11 h-11 rounded-full border-0 backdrop-blur-md bg-gray-400/30 cursor-pointer [&_svg]:size-8 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-gray-400/50"
          >
            <SendHorizontal />
          </Button>
        </form>

        {/* 이모지 박스 */}
        <div
          className={cn(
            'transition-all duration-300 ease-in-out bg-gray-900/30 w-full',
            showEmojibox
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <Emojibox emojiData={emojiData} theme="dark" />
        </div>
      </div>
    </div>
  );
}
