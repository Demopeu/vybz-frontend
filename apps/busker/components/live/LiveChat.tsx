'use client';

import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { use } from 'react';
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
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // STOMP WebSocket 연결 설정
  useEffect(() => {
    if (!streamKey) {
      setError('스트림 키가 없어 채팅을 연결할 수 없습니다.');
      return;
    }

    const client = new Client({
      brokerURL: `wss://back.vybz.kr/ws/live-chat?liveId=${streamKey}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('✅ 채팅 WebSocket 연결 성공!');
        setConnected(true);
        setError(null);

        // 해당 라이브 방 채팅 구독
        client.subscribe(`/topic/live-chat/${streamKey}`, (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);
            const newMessage: ChatMessage = {
              id: receivedMessage.id || Date.now().toString(),
              username: receivedMessage.senderName || '익명',
              message: receivedMessage.content,
              timestamp: new Date(),
              isSupporter: receivedMessage.isSupporter || false,
            };

            setChatMessages((prev) => [...prev.slice(-50), newMessage]);
          } catch (error) {
            console.error('메시지 파싱 오류:', error);
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP 오류:', frame);
        setError('채팅 연결에 문제가 발생했습니다.');
        setConnected(false);
      },
      onWebSocketError: (event) => {
        console.error('WebSocket 오류:', event);
        setError('채팅 서버에 연결할 수 없습니다.');
        setConnected(false);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, [streamKey]);

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    if (chatMessage.trim() && stompClient && stompClient.connected) {
      const message = {
        senderUuid: buskerUuid || 'anonymous',
        content: chatMessage,
      };

      stompClient.publish({
        destination: '/app/live-chat/sendMessage',
        body: JSON.stringify(message),
      });

      setChatMessage('');
    }
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
          ) : (
            <Badge variant="outline" className="bg-gray-600 text-white text-xs">
              연결 중...
            </Badge>
          )}
        </div>
        <Separator className="bg-gray-700" />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {error && (
          <div className="mx-4 my-2 p-2 bg-red-800/30 text-red-200 rounded-md text-sm">
            {error}
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
              disabled={!connected || !chatMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              채팅 규칙을 준수해 주세요. 건전한 채팅 문화를 만들어가요!
            </p>
            {!connected && !error && (
              <span className="text-xs text-yellow-400">
                채팅 서버 연결 중...
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
