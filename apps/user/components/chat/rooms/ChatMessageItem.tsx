'use client';

import { ChatMessageType } from '@/types/ResponseDataTypes';

export default function ChatMessageItem({
  message,
  currentUserUuid,
}: {
  message: ChatMessageType;
  currentUserUuid: string;
}) {
  const isMyMessage = message.senderUuid === currentUserUuid;

  const renderMessageContent = () => {
    switch (message.messageType) {
      case 'TEXT':
        return (
          <div className="flex items-end gap-2">
            <div
              className={`max-w-xs px-4 py-3 rounded-br-3xl rounded-bl-3xl ${
                isMyMessage
                  ? 'bg-white text-gray-800 rounded-tl-3xl'
                  : 'bg-indigo-800 text-white rounded-tr-3xl'
              }`}
            >
              <p className="text-sm font-medium whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
          </div>
        );

      case 'IMAGE':
        return <div>IMAGE</div>;

      case 'VIDEO':
        return <div>VIDEO</div>;

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-end gap-2 mb-3 font-poppins ${
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
