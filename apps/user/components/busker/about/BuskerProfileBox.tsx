'use client';

import { useState } from 'react';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import {
  addFollow,
  removeFollow,
} from '@/services/user-services/UserInfoServices';

interface BuskerProfileBoxProps {
  artistName: string;
  buskerProfileUrl: string;
  isFollowing: boolean;
  buskerUuid: string;
  user?: {
    userUuid: string;
    name?: string;
    image?: string;
  };
}

export function BuskerProfileBox({
  artistName,
  buskerProfileUrl,
  isFollowing: initialIsFollowing,
  buskerUuid,
  user,
}: BuskerProfileBoxProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex items-center mb-4">
      <Avatar className="w-16 h-16 ring-4 ring-white mr-4">
        <AvatarImage src={buskerProfileUrl} />
        <AvatarFallback className="bg-blue-300 text-gray-900 text-xl font-bold">
          {artistName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-white text-xl font-bold">{artistName}</h2>
      <Button
        variant={isFollowing ? 'destructive' : 'default'}
        className={`ml-4 border-0 w-15 h-9 text-sm ${isFollowing ? 'hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        onClick={async () => {
          if (!user) {
            alert('로그인이 필요합니다.');
            return;
          }

          setIsLoading(true);
          try {
            if (isFollowing) {
              // 언팔로우 처리
              const success = await removeFollow(user.userUuid, buskerUuid);
              if (success) {
                setIsFollowing(false);
              } else {
                console.error('언팔로우 처리 실패');
              }
            } else {
              // 팔로우 처리
              const success = await addFollow(
                {
                  userUuid: user.userUuid,
                  nickname: user.name || '',
                  profileImageUrl: user.image || '',
                },
                {
                  buskerUuid,
                  nickname: artistName,
                  profileImageUrl: buskerProfileUrl,
                }
              );
              if (success) {
                setIsFollowing(true);
              } else {
                console.error('팔로우 처리 실패');
              }
            }
          } catch (error) {
            console.error('팔로우/언팔로우 처리 중 오류:', error);
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
      >
        {isLoading ? '처리 중...' : isFollowing ? '언팔로우' : '팔로우'}
      </Button>
    </div>
  );
}
