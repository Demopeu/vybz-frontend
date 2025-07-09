'use client';

import { useRef, useState } from 'react';
import { startLive, stopLive } from '@/app/api/liveServiceApi';
import { Card, CardHeader, CardContent } from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Badge } from '@repo/ui/components/ui/badge';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Heart,
  Users,
  Gift,
  Settings,
} from '@repo/ui/components/icons';
import { LiveContext } from '@/context/LiveContext';
import { use } from 'react';

export default function LiveStreamController({
  buskerUuid,
  buskerAccessToken,
  viewerCount,
  likeCount,
}: {
  buskerUuid: string;
  buskerAccessToken: string;
  viewerCount: number;
  likeCount: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamKey, setCurrentStreamKey] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isConnected, setIsConnected] = useState(false);
  const { setStreamKey } = use(LiveContext);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sendQueue: Array<ArrayBuffer> = [];
  let isSending = false;

  // 오디오/비디오 컨트롤 기능
  const toggleMute = () => {
    if (mediaStreamRef.current) {
      const audioTracks = mediaStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTracks = mediaStreamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isVideoOn;
      });
      setIsVideoOn(!isVideoOn);
    }
  };

  const processQueue = (ws: WebSocket) => {
    if (isSending || sendQueue.length === 0 || ws.readyState !== WebSocket.OPEN)
      return;
    isSending = true;
    const chunk = sendQueue.shift();
    if (chunk) ws.send(chunk);
    isSending = false;
    setTimeout(() => processQueue(ws), 50);
  };

  const startStreaming = async () => {
    if (!title.trim()) {
      setErrorMessage('제목을 입력해주세요.');
      return;
    }
    if (!buskerUuid || !buskerAccessToken) {
      setErrorMessage('로그인 정보가 없습니다. 다시 로그인 해주세요.');
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    try {
      console.log('📹 미디어 스트림 초기화...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      const res = await startLive(
        { title, categoryId: 1 },
        buskerUuid,
        buskerAccessToken
      );
      const streamKey = res.streamKey;
      setCurrentStreamKey(streamKey);
      setStreamKey(streamKey);

      const wsUrl = `wss://back.vybz.kr/ws-live/stream?streamKey=${streamKey}&token=${buskerAccessToken}`;

      console.log('Connecting to WebSocket with URL:', wsUrl);

      const ws = new WebSocket(wsUrl);
      ws.binaryType = 'arraybuffer';
      setSocket(ws);

      ws.onopen = () => {
        console.log('✅ WebSocket 연결 성공!');
        setIsConnected(true);
      };

      ws.onclose = (event) => {
        console.log('❌ WebSocket 연결 종료:', event.code, event.reason);
        setIsConnected(false);
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket 연결 에러:', error);
        setIsConnected(false);
      };

      let mediaRecorder: MediaRecorder | null = null;
      const mimeTypeOptions = [
        'video/webm;codecs=vp8',
        'video/webm;codecs=vp9',
        'video/webm',
      ];
      for (const mimeType of mimeTypeOptions) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          mediaRecorder = new MediaRecorder(mediaStream, { mimeType });
          break;
        }
      }
      if (!mediaRecorder) {
        mediaRecorder = new MediaRecorder(mediaStream); // fallback
      }
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
          const arrayBuffer = await event.data.arrayBuffer();
          sendQueue.push(arrayBuffer);
          processQueue(ws);
        }
      };
      mediaRecorder.onstop = () => {
        console.log('🎥 MediaRecorder 정지됨');
      };
      mediaRecorder.start(1000);
      setIsStreaming(true);
    } catch (err) {
      console.error('🔥 스트리밍 시작 실패:', err);
      setErrorMessage('스트리밍을 시작할 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const endStreaming = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    if (currentStreamKey && buskerUuid && buskerAccessToken) {
      try {
        await stopLive(
          { streamKey: currentStreamKey },
          buskerUuid,
          buskerAccessToken
        );
        console.log('✅ 방송 종료 API 호출 완료');
      } catch (err) {
        console.error('❌ 방송 종료 API 호출 실패:', err);
      }
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }

    setSocket(null);
    setIsStreaming(false);
    setIsConnected(false);
  };

  return (
    <div className="space-y-4">
      {/* LiveInfo 스타일의 제목 입력 및 방송 시작/종료 컨트롤 */}

      {/* 비디오 스트림 영역 */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="relative bg-black aspect-video overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            
            {/* 방송 시작 전 미리보기 */}
            {!isStreaming && (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Video className="h-12 w-12" />
                  </div>
                  <p className="text-lg font-semibold">카메라 미리보기</p>
                  <p className="text-sm text-gray-300 max-w-md mt-2">
                    방솤 제목을 입력하고 방송 시작 버튼을 눌러주세요
                  </p>
                </div>
              </div>
            )}
            
            {/* 에러 메시지 표시 */}
            {errorMessage && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-purple-900 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <VideoOff className="h-12 w-12" />
                  </div>
                  <p className="text-lg font-semibold">스트림 오류</p>
                  <p className="text-sm text-gray-300 max-w-md">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Live Badge and Connection Status */}
            {isStreaming && (
              <div className="absolute top-4 left-4 flex space-x-2">
                <Badge variant="destructive" className="animate-pulse">
                  🔴 LIVE
                </Badge>
                {isConnected ? (
                  <Badge variant="default" className="bg-green-600">
                    연결됨
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-600">
                    연결 중...
                  </Badge>
                )}
              </div>
            )}

            {/* Viewer Count */}
            {isStreaming && (
              <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1 text-sm text-white">
                <Users className="h-4 w-4 inline mr-1" />
                {viewerCount.toLocaleString()}
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="p-4 bg-div-background">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant={isLiked ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setLocalLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
                  }}
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
                  onClick={toggleMute}
                  disabled={!isStreaming}
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
                  onClick={toggleVideo}
                  disabled={!isStreaming}
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

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">스트림 정보</h3>
            <div className="flex items-center space-x-2">
              {!isStreaming ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={startStreaming}
                  className={`bg-green-600 hover:bg-green-700 ${
                    !title.trim() || isLoading
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={!title.trim() || isLoading}
                >
                  {isLoading ? (
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
                  onClick={endStreaming}
                  className={`bg-red-600 hover:bg-red-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
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
                    disabled={isLoading || isStreaming}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      if (tempTitle.trim()) {
                        setTitle(tempTitle);
                        setIsEditingTitle(false);
                      }
                    }}
                    disabled={!tempTitle.trim() || isLoading || isStreaming}
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
                    disabled={isLoading || isStreaming}
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                  <span className="text-white">
                    {title || '제목을 입력하세요'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTempTitle(title);
                      setIsEditingTitle(true);
                    }}
                    disabled={isLoading || isStreaming}
                    className="text-gray-300 hover:text-white"
                  >
                    편집
                  </Button>
                </div>
              )}
            </div>

            {/* 방송 상태 표시 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-300">
                  방송 상태:
                </span>
                {isStreaming ? (
                  <Badge variant="destructive" className="animate-pulse">
                    🔴 LIVE
                  </Badge>
                ) : (
                  <Badge variant="secondary">⚫ OFFLINE</Badge>
                )}
              </div>
            </div>

            {/* 에러 메시지 표시 */}
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-300 text-sm">{errorMessage}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
