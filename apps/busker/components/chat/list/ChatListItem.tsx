'use client';

import UnreadBadge from '@/components/common/badge/UnreadBadge';
import Image from 'next/image';
import Link from 'next/link';
import { formatTimeAgo } from '@/utils/format';
import { shortString } from '@/utils/format';

interface ChatListItemProps {
  chatId: string;
  profileImage?: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messageType?: string;
}

export default function ChatListItem({
  chatId,
  profileImage = '/images/default-profile.png',
  name,
  lastMessage,
  lastMessageTime,
  unreadCount,
  messageType,
}: ChatListItemProps) {
  return (
    <Link
      href={`/chat/${chatId}`}
      className="flex items-center justify-between py-4"
    >
      <div className="flex items-center space-x-4">
        <div className="relative w-13 h-13 shrink-0 rounded-full overflow-hidden">
          <Image
            src={profileImage}
            alt={name}
            fill
            className="object-cover"
            sizes="52px"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-base font-medium text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-400">
            {messageType === 'SYSTEM' && lastMessage === 'Created ChatRoom' 
              ? "채팅창이 활성화 되었습니다." 
              : shortString(lastMessage, 20)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-400">
          {formatTimeAgo(lastMessageTime)}
        </span>
        {unreadCount > 0 && (
          <UnreadBadge count={unreadCount} />
        )}
      </div>
    </Link>
  );
}
