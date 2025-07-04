'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Users, Share2 } from '@repo/ui/components/icons';
import { BuskerInfoReadResponseType } from '@/types/ResponseDataTypes';
import { LiveContext } from '@/context/LiveContext';
import { use } from 'react';

export default function LiveHeader({
  buskerInfo,
  viewerCount,
}: {
  buskerInfo: BuskerInfoReadResponseType;
  viewerCount: number;
}) {
  const { nickname, profileImageUrl } = buskerInfo;

  const { isLive, title } = use(LiveContext);

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profileImageUrl} />
            <AvatarFallback>{nickname.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold">{nickname}</h1>
          <div className="flex items-center space-x-2">
            {isLive && (
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            )}
            <span className="text-sm text-gray-400">{title}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4" />
            <span>{viewerCount.toLocaleString()}</span>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            공유
          </Button>
        </div>
      </div>
    </header>
  );
}
