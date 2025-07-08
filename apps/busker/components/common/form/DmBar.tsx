'use client';

import { use } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { SendHorizontal, Smile } from '@repo/ui/components/icons';
import { ChatContext } from '@/context/ChatContext';
import Emojibox from '@/components/common/EmojiBox';
import { emojiData } from '@/data/EmojiData';
import { ChatRoomContext } from '@/context/ChatRoomContext';
import { sendMessage } from '@/services/chat-services';

export default function DmBar({ className }: { className?: string }) {
  const { showEmojibox, toggleShowEmojibox, comment, setComment } =
    use(ChatContext);

  const { chatRoomId, userUuid, buskerUuid, addMessage } = use(ChatRoomContext);

  // 메시지 전송 로직
  const sendMessageAction = async () => {
    if (!comment.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }

    if (!chatRoomId || !userUuid || !buskerUuid) {
      alert('채팅방 정보가 없습니다.');
      return;
    }

    try {
      const messageData = {
        chatRoomId,
        senderUuid: buskerUuid,
        receiverUuid: userUuid,
        messageType: 'TEXT' as const,
        content: comment.trim(),
      };

      // 로컬에 임시 메시지 추가 (UX 개선)
      const tempMessage = {
        id: `temp-${Date.now()}`,
        senderUuid: buskerUuid,
        messageType: 'TEXT' as const,
        content: comment.trim(),
        read: false,
        sentAt: new Date().toISOString(),
        isTemporary: true,
      };
      
      addMessage(tempMessage);
      setComment(''); // 입력 필드 즉시 클리어

      const response = await sendMessage(messageData);

      if (response.isSuccess) {
        console.log('메시지가 전송되었습니다.');
      } else {
        alert(response.message || '메시지 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      alert('메시지 전송 중 오류가 발생했습니다.');
    }
  };

  // 메시지 전송 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessageAction();
  };

  return (
    <div
      className={`w-full z-50 bg-blue-400 border-2 border-blue-400 ${className}`}
    >
      <form
        onSubmit={handleSubmit}
        className=" relative flex items-center justify-between px-4 py-2 w-full border-2 border-blue-400"
      >
        <label className="relative w-full pr-4" id="comment">
          <Button
            type="button"
            onClick={toggleShowEmojibox}
            className="absolute top-1/2 -translate-y-1/2 text-blue-400 z-10 w-12 h-12 border-0 bg-transparent hover:bg-transparent [&_svg]:size-6"
          >
            <Smile />
          </Button>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessageAction();
              }
            }}
            placeholder="Send your message"
            className="text-black border-2 border-blue-400 bg-white rounded-full h-12 py-0 !pl-12 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </label>
        <Button
          type="submit"
          size="icon"
          disabled={!comment.trim() || !chatRoomId || !userUuid || !buskerUuid}
          className="w-11 h-11 rounded-full border-0 backdrop-blur-md bg-white cursor-pointer [&_svg]:size-8 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendHorizontal fill="#60a5fa" />
        </Button>
      </form>

      <div
        className={cn(
          'transition-all duration-300 ease-in-out bg-gray-900/30 w-full',
          showEmojibox
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        <Emojibox emojiData={emojiData} />
      </div>
    </div>
  );
}
