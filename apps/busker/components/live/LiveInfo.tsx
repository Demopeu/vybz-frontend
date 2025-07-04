'use client';

import { Card, CardHeader, CardContent } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Settings, Video, VideoOff } from '@repo/ui/components/icons';
import { useState, useEffect } from 'react';
import { Input } from '@repo/ui/components/ui/input';
import { LiveContext } from '@/context/LiveContext';
import { use } from 'react';
import { startLive, stopLive } from '@/services/live-services/live-service';

export default function LiveInfo({ token }: { token: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { isLive, toggleIsLive, title, setTitle, streamKey, setStreamKey } = use(LiveContext);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  // 방송 시작
  const handleStartLive = async () => {
    if (!title.trim()) {
      setErrorMsg('방송 제목을 입력하세요.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      // 서버에 라이브 시작 요청
      const res = await startLive({ title, categoryId: 1 });
      const newStreamKey = res.streamKey;
      setStreamKey(newStreamKey);

      // WebSocket 연결
      const wsUrl = `wss://back.vybz.kr/ws-live/stream?streamKey=${newStreamKey}&token=${token}`;
      console.log('WebSocket 연결 시도:', wsUrl);

      const ws = new WebSocket(wsUrl);
      ws.binaryType = 'arraybuffer';
      setSocket(ws);

      ws.onopen = () => {
        console.log('✅ WebSocket 연결 성공!');
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket 연결 에러:', error);
        setErrorMsg('WebSocket 연결에 실패했습니다.');
      };

      toggleIsLive();
    } catch (error) {
      console.error('🔥 라이브 시작 실패:', error);
      setErrorMsg('라이브 방송을 시작할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 방송 종료
  const handleStopLive = async () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
      setSocket(null);
    }
    setLoading(true);
    setErrorMsg('');
    try {
      // streamKey가 있을 경우에만 API 호출
      if (streamKey) {
        await stopLive({ streamKey });
        setStreamKey(null);
      }
      toggleIsLive();
    } catch (error) {
      setErrorMsg(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">스트림 정보</h3>
          <div className="flex items-center space-x-2">
            {!isLive ? (
              <Button
                variant="default"
                size="sm"
                onClick={handleStartLive}
                className={`bg-green-600 hover:bg-green-700 ${
                  !title.trim() || loading
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={!title.trim() || loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    시작 중...
                  </span>
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-2" />
                    방송 시작
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleStopLive}
                className={`bg-red-600 hover:bg-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    종료 중...
                  </span>
                ) : (
                  <>
                    <VideoOff className="h-4 w-4 mr-2" />
                    방송 종료
                  </>
                )}
              </Button>
            )}
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
                  maxLength={50}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && tempTitle.trim()) {
                      setTitle(tempTitle);
                      setIsEditingTitle(false);
                    }
                  }}
                  disabled={loading}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (tempTitle.trim()) {
                      setTitle(tempTitle);
                      setIsEditingTitle(false);
                    }
                  }}
                  disabled={!tempTitle.trim() || loading}
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
                  disabled={loading}
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
                  disabled={loading}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-700/30 text-red-200 rounded">
              {errorMsg}
            </div>
          )}

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
