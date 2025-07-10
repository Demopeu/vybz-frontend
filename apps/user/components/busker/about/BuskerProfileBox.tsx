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
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Avatar className="w-20 h-20 ring-2 ring-white">
            <AvatarImage src={buskerProfileUrl} className="object-cover" />
            <AvatarFallback className="bg-blue-300 text-gray-900 text-2xl font-bold">
              {artistName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-white text-2xl font-bold ml-4">{artistName}</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className={`rounded-lg font-medium px-3 py-0.5 text-xs ${isFollowing ? 'bg-[#0051b9] text-white hover:bg-[#0044a0] border-[#0051b9]' : 'bg-gray-600 text-white hover:bg-[#6a6b6c] border-[#757677]'}`}
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
          {isLoading ? '처리중' : isFollowing ? '팔로잉' : '팔로우'}
        </Button>
      </div>

      {/* 상태 박스 영역 */}
      <div className="flex justify-between items-center mt-4 px-2">
        <div className="text-center">
          <p className="text-gray-300 text-sm">구독자</p>
          <p className="text-white font-semibold">1.2K</p>
        </div>
        <div className="h-8 w-px bg-gray-600"></div>
        <div className="text-center">
          <p className="text-gray-300 text-sm">영상</p>
          <p className="text-white font-semibold">24</p>
        </div>
        <div className="h-8 w-px bg-gray-600"></div>
        <div className="text-center">
          <p className="text-gray-300 text-sm">좋아요</p>
          <p className="text-white font-semibold">5.6K</p>
        </div>
      </div>

      {/* 구독, 메시지, 후원 버튼 */}
      <div className="flex gap-3 mt-4">
        <Button
          variant="outline"
          className="flex-1 bg-gray-600 border-gray-600 text-white hover:bg-gray-500 font-medium rounded-lg h-12"
          onClick={() => router.push(`/busker/${buskerUuid}/subscribe`)}
        >
          구독하기
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-gray-600 border-gray-600 text-white hover:bg-gray-500 font-medium rounded-lg h-12"
          onClick={() => router.push(`/chat/list`)}
        >
          메시지
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-gray-600 border-gray-600 text-white hover:bg-gray-500 font-medium rounded-lg h-12"
        >
          후원하기
        </Button>
      </div>
    </div>
  );
}
