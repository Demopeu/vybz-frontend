'use client';

import { use } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { SendHorizontal, Smile } from '@repo/ui/components/icons';
import { ChatContext } from '@/context/ChatContext';
import { ChatRoomContext } from '@/context/ChatRoomContext';
import Emojibox from '@/components/common/EmojiBox';
import { emojiData } from '@/data/EmojiData';
import { useParams, useSearchParams } from 'next/navigation';
import { sendMessage } from '@/services/chat-services';

export default function DmBar({ userUuid }: { userUuid: string }) {
  const { showEmojibox, toggleShowEmojibox, comment, setComment } =
    use(ChatContext);

  const { addMessage } = use(ChatRoomContext);

  const params = useParams();
  const searchParams = useSearchParams();

  const buskerId = params.buskerId as string;
  const chatRoomId = searchParams.get('chatId');

  console.log('buskerId', buskerId);
  console.log('userUuid', userUuid);
  console.log('chatRoomId', chatRoomId);

  // 메시지 전송 로직
  const sendMessageAction = async () => {
    if (!comment.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }

    if (!chatRoomId || !userUuid || !buskerId) {
      alert('채팅방 정보가 없습니다.');
      return;
    }

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
        // 즉시 로컬 상태에 메시지 추가
        const newMessage = {
          id: Date.now().toString(), // 임시 ID
          senderUuid: userUuid,
          messageType: 'TEXT' as const,
          content: comment.trim(),
          sentAt: new Date().toISOString(),
          read: false,
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
    }
  };

  // 메시지 전송 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessageAction();
  };

  return (
    <div className="w-full z-50 bg-gradient-to-b mb-2">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center gap-2 w-full"
      >
        <button
          type="button"
          onClick={toggleShowEmojibox}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-gray-800 text-2xl mr-2"
        >
          <Smile className="text-white" />
        </button>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessageAction();
            }
          }}
          placeholder="메시지를 입력하세요..."
          className="flex-1 bg-black text-white placeholder-gray-400 rounded-full px-5 py-3 border-none outline-none shadow-md"
        />
        <button
          type="submit"
          disabled={!comment.trim() || !chatRoomId || !userUuid || !buskerId}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-0 ml-2 shrink-0"
        >
          <SendHorizontal className="text-white w-6 h-6" />
        </button>
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
