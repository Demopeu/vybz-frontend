'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Bell, Search } from '@repo/ui/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, use, useState } from 'react';
import { ChatRoomContext } from '@/context/ChatRoomContext';
import { getUserInfo } from '@/services/user-services/UserInfoServices';
import { UserInfoDataType } from '@/types/ResponseDataTypes';

export default function ChatHeader() {
  const { userUuid } = use(ChatRoomContext);
  const [userInfo, setUserInfo] = useState<UserInfoDataType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userUuid) {
        setUserInfo(null);
        return;
      }

      setLoading(true);
      try {
        const info = await getUserInfo(userUuid);
        setUserInfo(info);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userUuid]);

  const displayName = loading ? '로딩 중...' : (userInfo?.nickname || '알 수 없음');
  const profileImageUrl = userInfo?.profileImageUrl || '';

  return (
    <header className="w-full text-white flex items-center justify-between">
      <div className="flex items-center space-x-2 py-4 pl-10 pr-10  bg-blue-400 rounded-t-4xl flex-2/5">
        <Link
          href={userUuid ? `/user/${userUuid}` : '#'}
          className="flex items-center space-x-2"
        >
          <div className="relative w-10 h-10 shrink-0">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={displayName}
                fill
                sizes="40px"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm">?</span>
              </div>
            )}
          </div>
          <div className="ml-1">
            <h3 className="font-bold">{displayName}</h3>
            <p className="text-sm text-gray-400">Chat</p>
          </div>
        </Link>
      </div>
      <div className="flex-2/5 bg-blue-400 rounded-tl-4xl border-0">
        <div className="flex items-center justify-end space-x-4 pr-10 py-4.5 bg-background rounded-bl-4xl">
          <Button className="[&_svg]:size-7 p-1 border-2 border-white rounded-full shrink-0">
            <Bell />
          </Button>
          <Button className="[&_svg]:size-7 p-1 border-2 border-white rounded-full shrink-0">
            <Search />
          </Button>
        </div>
      </div>
    </header>
  );
}
