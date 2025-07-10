'use client';

import { use, useState, useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { SendHorizontal, Smile } from '@repo/ui/components/icons';
import { ChatContext } from '@/context/ChatContext';
import { ChatRoomContext } from '@/context/ChatRoomContext';
import Emojibox from '@/components/common/EmojiBox';
import { emojiData } from '@/data/EmojiData';
import { useParams, useSearchParams } from 'next/navigation';
import { sendMessage } from '@/services/chat-services';

export default function DmBar({
  className,
  userUuid,
}: {
  className?: string;
  userUuid: string;
}) {
  const { showEmojibox, toggleShowEmojibox, comment, setComment } =
    use(ChatContext);

  const { addMessage, setBuskerUuid, setUserUuid, setChatRoomId } = use(ChatRoomContext);

  const [isSending, setIsSending] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();

  const buskerId = params.buskerId as string;
  const chatRoomId = searchParams.get('chatId');

  // context에 uuid와 chatRoomId 설정 (로컬 저장소 연동을 위해)
  useEffect(() => {
    if (buskerId) setBuskerUuid(buskerId);
    if (userUuid) setUserUuid(userUuid);
    if (chatRoomId) setChatRoomId(chatRoomId);
  }, [buskerId, userUuid, chatRoomId, setBuskerUuid, setUserUuid, setChatRoomId]);

  console.log('buskerId', buskerId);
  console.log('userUuid', userUuid);
  console.log('chatRoomId', chatRoomId);

  // 메시지 전송 로직
  const sendMessageAction = async () => {
    if (isSending) return; // Prevent duplicate submissions while sending

    if (!comment.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }

    if (!chatRoomId || !userUuid || !buskerId) {
      alert('채팅방 정보가 없습니다.');
      return;
    }

    setIsSending(true); // Set sending state to true when starting transmission

    try {
      const messageData = {
        chatRoomId,
        senderUuid: userUuid,
        receiverUuid: buskerId,
        messageType: 'TEXT' as const,
        content: comment.trim(),
      };

      // Server Action 호출
      const response = await sendMessage(messageData);

      if (response.isSuccess) {
        // 즉시 로컬 상태에 메시지 추가 (임시 메시지)
        const newMessage = {
          id: `temp-${Date.now()}`, // 임시 ID로 표시
          senderUuid: userUuid,
          messageType: 'TEXT' as const,
          content: comment.trim(),
          sentAt: new Date().toISOString(),
          read: false,
          isTemporary: true, // 임시 메시지 표시
        };
        addMessage(newMessage);

        setComment('');
        console.log('메시지가 전송되었습니다.');
      } else {
        alert(response.message || '메시지 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('메시지 전송 오류:', error);
      alert('메시지 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSending(false); // Reset sending state whether successful or not
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
              if (e.key === 'Enter' && !e.shiftKey && !isSending) {
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
          disabled={
            !comment.trim() ||
            !chatRoomId ||
            !userUuid ||
            !buskerId ||
            isSending
          }
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
