'use client';

import { UserInfoDataType } from '@/types/ResponseDataTypes';
import UnreadBadge from '@/components/common/badge/UnreadBadge';
import Image from 'next/image';
import { formatTimeAgo } from '@/utils/format';
import { shortString } from '@/utils/format';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ChatListItemProps {
  chatId: string;
  userInfo?: UserInfoDataType;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messageType?: string;
  isSelected?: boolean;
  isLoading?: boolean;
  onSelect?: () => void;
  buskerId?: string;
}

const ChatListItem = React.memo(function ChatListItem({
  chatId,
  userInfo,
  lastMessage,
  lastMessageTime,
  unreadCount,
  messageType,
  isSelected = false,
  isLoading = false,
  onSelect,
  buskerId,
}: ChatListItemProps) {
  const router = useRouter();
  const nickname = userInfo?.nickname || '알 수 없음';
  const profileImageUrl = userInfo?.profileImageUrl || '/default-profile.png';

  const handleClick = () => {
    if (buskerId) {
      router.push(`/chat/${buskerId}?chatId=${chatId}`);
    }
    onSelect?.();
  };

  if (isLoading) {
    return (
      <div
        data-chat-id={chatId}
        className={`flex items-center justify-between py-4 cursor-pointer ${isSelected ? 'bg-gray-800 rounded-lg' : ''}`}
      >
        <div className="flex items-center space-x-4">
          <div className="relative w-13 h-13 shrink-0 rounded-full bg-gray-600 animate-pulse" />
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-24 bg-gray-600 rounded animate-pulse" />
            <div className="h-3 w-32 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" />
          {unreadCount > 0 && <UnreadBadge count={unreadCount} />}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      data-chat-id={chatId}
      className={`flex items-center justify-between py-4 cursor-pointer px-8 ${isSelected ? 'bg-gray-800 rounded-lg' : ''}`}
    >
      <div className="flex items-center space-x-4">
        <div className="relative w-13 h-13 shrink-0 rounded-full overflow-hidden">
          <Image
            src={profileImageUrl}
            alt={nickname}
            fill
            className="object-cover"
            sizes="52px"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-base font-medium text-white">{nickname}</h3>
          <p className="text-sm text-gray-400">
            {messageType === 'SYSTEM' && lastMessage === 'Created ChatRoom'
              ? '채팅창이 활성화 되었습니다.'
              : shortString(lastMessage, 20)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-400">
          {formatTimeAgo(lastMessageTime)}
        </span>
        {unreadCount > 0 && <UnreadBadge count={unreadCount} />}
      </div>
    </div>
  );
});

export default ChatListItem;
