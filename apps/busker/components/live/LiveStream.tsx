'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import {
  Heart,
  Users,
  Gift,
  Settings,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from '@repo/ui/components/icons';
import { LiveContext } from '@/context/LiveContext';
import { use } from 'react';

export default function LiveStream({
  viewerCount,
  likeCount,
}: {
  viewerCount: number;
  likeCount: number;
}) {
  const { isLive } = use(LiveContext);

  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <Card className="bg-div-background border-gray-700">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
          {/* Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Video className="h-12 w-12" />
              </div>
              <p className="text-lg font-semibold">라이브 스트리밍 중</p>
              <p className="text-sm text-gray-300">
                거리에서 들려오는 아름다운 선율
              </p>
            </div>
          </div>

          {/* Live Badge */}
          {isLive && (
            <div className="absolute top-4 left-4">
              <Badge variant="destructive" className="animate-pulse">
                🔴 LIVE
              </Badge>
            </div>
          )}

          {/* Viewer Count */}
          <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1 text-sm text-white">
            <Users className="h-4 w-4 inline mr-1" />
            {viewerCount.toLocaleString()}
          </div>
        </div>

        {/* Video Controls */}
        <div className="p-4 bg-div-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={isLiked ? 'default' : 'outline'}
                size="sm"
                onClick={handleLike}
                className={
                  isLiked
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-400 border-blue-400'
                }
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`}
                />
                {localLikeCount}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-400 border-blue-400"
              >
                <Gift className="h-4 w-4 mr-2" />
                후원하기
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-400 border-blue-400"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-400 border-blue-400"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <VideoOff className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-400 border-blue-400"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
