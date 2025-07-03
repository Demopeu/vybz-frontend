'use client';

import { Card, CardHeader, CardContent } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Settings, Video, VideoOff } from '@repo/ui/components/icons';
import { useState } from 'react';
import { Input } from '@repo/ui/components/ui/input';
import { LiveContext } from '@/context/LiveContext';
import { use } from 'react';

export default function LiveInfo() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const { isLive, title, toggleIsLive, setTitle } = use(LiveContext);

  return (
    <Card className="bg-gray-800 border-gray-700 mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">스트림 정보</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={isLive ? 'destructive' : 'default'}
              size="sm"
              onClick={() => toggleIsLive()}
              className={
                isLive
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }
            >
              {isLive ? (
                <>
                  <VideoOff className="h-4 w-4 mr-2" />
                  방송 종료
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  방송 시작
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stream Title Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              방송 제목
            </label>
            {isEditingTitle ? (
              <div className="flex space-x-2">
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white flex-1"
                  placeholder="방송 제목을 입력하세요"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setTitle(tempTitle);
                      setIsEditingTitle(false);
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    setTitle(tempTitle);
                    setIsEditingTitle(false);
                  }}
                >
                  저장
                </Button>
                <Button
                  variant="outline"
                  className="bg-blue-400"
                  size="sm"
                  onClick={() => {
                    setIsEditingTitle(false);
                    setTempTitle('');
                  }}
                >
                  취소
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                <span className="text-white">{title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTempTitle(title);
                    setIsEditingTitle(true);
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Stream Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">
                방송 상태:
              </span>
              {isLive ? (
                <Badge variant="destructive" className="animate-pulse">
                  🔴 LIVE
                </Badge>
              ) : (
                <Badge variant="secondary">⚫ OFFLINE</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
