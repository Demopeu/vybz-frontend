'use client';

import Image from 'next/image';
import { ChatMessageType } from '@/types/ResponseDataTypes';

export default function ChatMessageItem({
  message,
  currentUserUuid,
}: {
  message: ChatMessageType;
  currentUserUuid: string;
}) {
  const isMyMessage = message.senderUuid === currentUserUuid;

  const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video
        .play()
        .catch((error) => console.error('Error playing video:', error));
    } else {
      video.pause();
    }
  };

  const renderMessageContent = () => {
    switch (message.messageType) {
      case 'TEXT':
        return (
          <div
            className={`max-w-xs px-5 py-3 rounded-2xl shadow-md font-semibold text-base
            ${
              isMyMessage
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-br-2xl rounded-tl-2xl'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-bl-2xl rounded-tr-2xl'
            }
          `}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        );

      case 'IMAGE':
        return (
          <Image
            src={message.content}
            alt="Image"
            width={128}
            height={128}
            className="max-w-xs rounded-4xl"
          />
        );

      case 'VIDEO':
        return (
          <video
            src={message.content}
            className="max-w-xs rounded-4xl cursor-pointer"
            controls
            onClick={handleVideoClick}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-end gap-3 mb-3 font-poppins ${
        isMyMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      {isMyMessage && !message.read && (
        <div className="text-xs text-red-500 font-semibold mb-1">1</div>
      )}
      {renderMessageContent()}
      {!isMyMessage && !message.read && (
        <div className="text-xs text-red-500 font-semibold mb-1">1</div>
      )}
    </div>
  );
}
