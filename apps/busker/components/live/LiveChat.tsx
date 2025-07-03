'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Card, CardHeader, CardContent } from '@repo/ui/components/ui/card';
import { ScrollArea } from '@repo/ui/components/ui/scrollarea';
import { Separator } from '@repo/ui/components/ui/separator';
import { Send } from '@repo/ui/components/icons';
import { ChatMessage } from '@/types/live';
import { 
  initialChatMessages, 
  randomMessages, 
  randomUsernames 
} from '@/data/live-dummy-data';

export default function LiveChat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [chatMessage, setChatMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // 실시간 채팅 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomUsernameIndex = Math.floor(Math.random() * randomUsernames.length);
        const randomMessageIndex = Math.floor(Math.random() * randomMessages.length);
        
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          username: randomUsernames[randomUsernameIndex] || '익명',
          message: randomMessages[randomMessageIndex] || '👋',
          timestamp: new Date(),
          isSupporter: Math.random() > 0.8,
        };

        setChatMessages((prev) => [...prev.slice(-20), newMessage]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        username: '나',
        message: chatMessage,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setChatMessage('');
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold">실시간 채팅</h3>
        <Separator className="bg-gray-700" />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 px-4">
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
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            채팅 규칙을 준수해 주세요. 건전한 채팅 문화를 만들어가요! 🎵
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
