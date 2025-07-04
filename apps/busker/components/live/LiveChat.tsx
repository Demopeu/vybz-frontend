'use client';

import { useState, useEffect, useRef, useCallback, use } from 'react';
import { Client } from '@stomp/stompjs';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Badge } from '@repo/ui/components/ui/badge';
import { Card, CardHeader, CardContent } from '@repo/ui/components/ui/card';
import { ScrollArea } from '@repo/ui/components/ui/scrollarea';
import { Separator } from '@repo/ui/components/ui/separator';
import { Send } from '@repo/ui/components/icons';
import { ChatMessage } from '@/types/liveTypes';
import { LiveContext } from '@/context/LiveContext';

interface LiveChatProps {
  buskerUuid: string | null;
}

export default function LiveChat({ buskerUuid }: LiveChatProps) {
  const { streamKey } = use(LiveContext);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const maxReconnectAttempts = 5;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // 채팅 연결 함수
  const connectToChat = useCallback(async () => {
    if (!streamKey) {
      setError('스트림 키가 없어 채팅을 연결할 수 없습니다.');
      return;
    }

    if (connecting) return;

    setConnecting(true);
    setError(null);

    const client = new Client({
      brokerURL: `wss://back.vybz.kr/ws/live-chat?liveId=${streamKey}`,
      reconnectDelay: Math.min(5000 * Math.pow(2, reconnectAttempts), 30000), // 지수적 백오프
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log('[STOMP Debug]:', str);
      },
      onConnect: () => {
        console.log('✅ 채팅 WebSocket 연결 성공!');
        setConnected(true);
        setConnecting(false);
        setError(null);
        setReconnectAttempts(0);

        // 해당 라이브 방 채팅 구독
        client.subscribe(`/topic/live-chat/${streamKey}`, (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);
            console.log('수신된 메시지:', receivedMessage);
            
            const newMessage: ChatMessage = {
              id: receivedMessage.id || Date.now().toString(),
              username: receivedMessage.senderName || receivedMessage.username || '익명',
              message: receivedMessage.content || receivedMessage.message || '',
              timestamp: new Date(receivedMessage.timestamp || Date.now()),
              isSupporter: receivedMessage.isSupporter || false,
            };

            setChatMessages((prev) => [...prev.slice(-49), newMessage]); // 최대 50개 메시지 유지
          } catch (error) {
            console.error('메시지 파싱 오류:', error);
            console.error('원본 메시지:', message.body);
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP 오류:', frame);
        setError(`채팅 연결 오류: ${frame.headers?.message || '알 수 없는 오류'}`);
        setConnected(false);
        setConnecting(false);
        
        // 재연결 시도
        if (reconnectAttempts < maxReconnectAttempts) {
          setReconnectAttempts(prev => prev + 1);
          setTimeout(() => {
            console.log(`재연결 시도 ${reconnectAttempts + 1}/${maxReconnectAttempts}`);
            connectToChat();
          }, 3000);
        } else {
          setError('최대 재연결 시도 횟수를 초과했습니다. 페이지를 새로고침해주세요.');
        }
      },
      onWebSocketError: (event) => {
        console.error('WebSocket 오류:', event);
        setError('채팅 서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
        setConnected(false);
        setConnecting(false);
      },
      onWebSocketClose: (event) => {
        console.log('WebSocket 연결 종료:', event);
        setConnected(false);
        setConnecting(false);
        
        // 비정상 종료인 경우 재연결 시도
        if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
          setReconnectAttempts(prev => prev + 1);
          setTimeout(() => {
            console.log('연결이 끊어져 재연결을 시도합니다...');
            connectToChat();
          }, 2000);
        }
      },
    });

    try {
      client.activate();
      setStompClient(client);
    } catch (error) {
      console.error('클라이언트 활성화 실패:', error);
      setError('채팅 클라이언트 초기화에 실패했습니다.');
      setConnecting(false);
    }
  }, [streamKey, reconnectAttempts, connecting]);

  // STOMP WebSocket 연결 설정
  useEffect(() => {
    connectToChat();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [connectToChat, stompClient]);

  // 메시지 전송 핸들러
  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    if (!stompClient || !stompClient.connected) {
      setError('채팅 서버에 연결되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      const message = {
        senderUuid: buskerUuid || 'anonymous',
        content: chatMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      console.log('메시지 전송:', message);
      
      stompClient.publish({
        destination: '/app/live-chat/sendMessage',
        body: JSON.stringify(message),
      });

      setChatMessage('');
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      setError('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 수동 재연결 함수
  const handleReconnect = () => {
    setReconnectAttempts(0);
    connectToChat();
  };

  return (
    <Card className="bg-gray-800 border-gray-700 h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">실시간 채팅</h3>
          {connected ? (
            <Badge
              variant="default"
              className="bg-green-600 text-white text-xs"
            >
              연결됨
            </Badge>
          ) : connecting ? (
            <Badge variant="outline" className="bg-yellow-600 text-white text-xs">
              연결 중...
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-600 text-white text-xs">
              연결 끊김
            </Badge>
          )}
        </div>
        <Separator className="bg-gray-700" />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {error && (
          <div className="mx-4 my-2 p-3 bg-red-800/30 text-red-200 rounded-md text-sm">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              {!connected && !connecting && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReconnect}
                  className="ml-2 h-6 text-xs bg-red-700/20 border-red-600 text-red-200 hover:bg-red-700/40"
                >
                  재연결
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-4 h-[calc(100%-100px)]" type="always">
          {chatMessages.length === 0 && !error ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              아직 채팅 메시지가 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
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

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <Input
              placeholder="메시지를 입력하세요..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              disabled={!connected}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              disabled={!connected || !chatMessage.trim() || connecting}
              className={`${!connected ? 'bg-gray-600 cursor-not-allowed' : ''}`}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              채팅 규칙을 준수해 주세요. 건전한 채팅 문화를 만들어가요!
            </p>
            <div className="flex items-center space-x-2">
              {connecting && (
                <span className="text-xs text-yellow-400">
                  채팅 서버 연결 중...
                </span>
              )}
              {reconnectAttempts > 0 && (
                <span className="text-xs text-orange-400">
                  재연결 시도: {reconnectAttempts}/{maxReconnectAttempts}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
