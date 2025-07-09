'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
  const { isLive, streamKey } = use(LiveContext);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  // webSocket state는 webSocketRef로 대체됨
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const sendQueueRef = useRef<ArrayBuffer[]>([]);
  const isSendingRef = useRef(false);
  const isSetupRef = useRef(false); // 중복 설치 방지
  const currentStreamRef = useRef<MediaStream | null>(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processQueueRef = useRef<((ws: WebSocket) => void) | null>(null);

  // 안정적인 데이터 전송 함수
  const processQueue = useCallback((ws: WebSocket) => {
    if (
      isSendingRef.current ||
      sendQueueRef.current.length === 0 ||
      ws.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    isSendingRef.current = true;
    const chunk = sendQueueRef.current.shift();

    if (chunk) {
      try {
        ws.send(chunk);
      } catch (error) {
        console.error('데이터 전송 실패:', error);
        // 전송 실패 시 다시 큐에 추가
        sendQueueRef.current.unshift(chunk);
      }
    }

    isSendingRef.current = false;

    // 큐에 데이터가 남아있으면 계속 처리
    if (sendQueueRef.current.length > 0) {
      setTimeout(() => processQueue(ws), 10);
    }
  }, []);

  // processQueue ref 업데이트
  useEffect(() => {
    processQueueRef.current = processQueue;
  }, [processQueue]);

  // 웹소켓 연결 함수
  const connectWebSocket = useCallback(
    (streamKey: string, token: string) => {
      const wsUrl = `wss://back.vybz.kr/ws-live/stream?streamKey=${streamKey}&token=${token}`;
      const ws = new WebSocket(wsUrl);
      ws.binaryType = 'arraybuffer';

      ws.onopen = () => {
        console.log('✅ 스트리밍 WebSocket 연결 성공!');
        setIsConnected(true);
        setReconnectAttempts(0);
        setStreamError(null);

        // 연결 성공 후 대기 중인 데이터 전송
        if (sendQueueRef.current.length > 0) {
          console.log(
            `🚀 대기 중인 데이터 ${sendQueueRef.current.length}개 전송 시작`
          );
          processQueue(ws);
        }
      };

      ws.onclose = (event) => {
        console.log('❌ WebSocket 연결 종료:', event.code, event.reason);
        setIsConnected(false);

        // 정상 종료가 아닌 경우 재연결 시도
        if (event.code !== 1000 && reconnectAttempts < 5) {
          setTimeout(
            () => {
              console.log(`재연결 시도 ${reconnectAttempts + 1}/5`);
              setReconnectAttempts((prev) => prev + 1);
              connectWebSocket(streamKey, token);
            },
            2000 * Math.pow(2, reconnectAttempts)
          ); // 지수 백오프
        }
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket 오류:', error);
        setStreamError('스트리밍 연결에 오류가 발생했습니다.');
        setIsConnected(false);
      };

      webSocketRef.current = ws;
      return ws;
    },
    [reconnectAttempts, processQueue]
  );

  // 스트리밍 웹소켓 연결
  useEffect(() => {
    if (isLive && streamKey) {
      const buskerAccessToken = process.env.NEXT_PUBLIC_BUSKER_ACCESS_TOKEN;
      if (buskerAccessToken) {
        const ws = connectWebSocket(streamKey, buskerAccessToken);
        return () => {
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close(1000, '스트리밍 종료');
          }
        };
      }
    }
  }, [isLive, streamKey, connectWebSocket]);

  // 비디오 스트림 시작 - 한 번만 실행되도록 수정
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    let currentRecorder: MediaRecorder | null = null;

    async function setupMediaStream() {
      // 중복 설치 방지 및 Hot Reload 대응
      if (isLive && !isSetupRef.current && !currentStreamRef.current) {
        try {
          console.log('🎥 새로운 미디어 스트림 시작...');
          isSetupRef.current = true;

          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          currentStream = stream;
          currentStreamRef.current = stream;

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setMediaStream(stream);
          mediaStreamRef.current = stream;
          setStreamError(null);

          // MediaRecorder 설정
          const mimeTypeOptions = [
            'video/webm;codecs=vp8',
            'video/webm;codecs=vp9',
            'video/webm',
          ];

          let mediaRecorder: MediaRecorder | null = null;
          for (const mimeType of mimeTypeOptions) {
            if (MediaRecorder.isTypeSupported(mimeType)) {
              mediaRecorder = new MediaRecorder(stream, { mimeType });
              break;
            }
          }

          if (!mediaRecorder) {
            mediaRecorder = new MediaRecorder(stream);
          }

          currentRecorder = mediaRecorder;
          mediaRecorderRef.current = mediaRecorder;

          mediaRecorder.ondataavailable = async (event) => {
            if (event.data.size > 0) {
              try {
                const arrayBuffer = await event.data.arrayBuffer();
                sendQueueRef.current.push(arrayBuffer);

                // WebSocket 상태를 동적으로 확인 - ref 사용
                const currentWs = webSocketRef.current;
                if (
                  currentWs &&
                  currentWs.readyState === WebSocket.OPEN &&
                  processQueueRef.current
                ) {
                  processQueueRef.current(currentWs);
                } else if (
                  currentWs &&
                  currentWs.readyState !== WebSocket.OPEN
                ) {
                  console.warn('⚠️ WebSocket 연결이 끊어짐. 데이터 대기 중...');
                }
              } catch (error) {
                console.error('❌ 데이터 처리 실패:', error);
              }
            }
          };

          mediaRecorder.onstop = () => {
            console.log('🎥 MediaRecorder 정지됨');
          };

          mediaRecorder.onerror = (error) => {
            console.error('🎥 MediaRecorder 오류:', error);
          };

          // 200ms 간격으로 데이터 전송
          mediaRecorder.start(200);
          console.log('🎥 MediaRecorder 시작됨');
        } catch (error) {
          console.error('미디어 스트림 가져오기 실패:', error);
          setStreamError(
            error instanceof DOMException && error.name === 'NotFoundError'
              ? '카메라 또는 마이크를 찾을 수 없습니다. 장치가 연결되어 있고 권한이 허용되어 있는지 확인하세요.'
              : error instanceof DOMException &&
                  error.name === 'NotAllowedError'
                ? '카메라 및 마이크 사용 권한이 거부되었습니다.'
                : '미디어 스트림을 시작할 수 없습니다.'
          );
        }
      } else if (
        !isLive &&
        (mediaStreamRef.current || currentStreamRef.current)
      ) {
        // 라이브 중단 시 스트림 정리
        console.log('🎥 라이브 중단 - 미디어 스트림 정리');
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === 'recording'
        ) {
          mediaRecorderRef.current.stop();
        }
        if (currentStreamRef.current) {
          currentStreamRef.current.getTracks().forEach((track) => track.stop());
          currentStreamRef.current = null;
        }
        if (mediaStreamRef.current) {
          mediaStreamRef.current
            .getTracks()
            .forEach((track: MediaStreamTrack) => track.stop());
        }
        setMediaStream(null);
        mediaStreamRef.current = null;
        isSetupRef.current = false;
      }
    }

    setupMediaStream();

    return () => {
      // 컴포넌트 언마운트 시 정리
      console.log('🎥 컴포넌트 언마운트 - 정리 작업');
      if (currentRecorder && currentRecorder.state === 'recording') {
        currentRecorder.stop();
      }
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach((track) => track.stop());
        currentStreamRef.current = null;
      }
      isSetupRef.current = false;
    };
  }, [isLive]); // webSocket, mediaStream, processQueue는 ref로 처리하여 의존성에서 제외

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // 비디오 ON/OFF 토글
  const toggleVideo = () => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isVideoOn;
      });
      setIsVideoOn(!isVideoOn);
    }
  };

  // 오디오 음소거 토글
  const toggleMute = () => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  return (
    <Card className="bg-div-background border-gray-700">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
          {/* 실제 비디오 스트림 */}
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            className="w-full h-full object-cover"
          />

          {/* 비디오가 없을 때 표시할 플레이스홀더 */}
          {!mediaStream && !streamError && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Video className="h-12 w-12" />
                </div>
                <p className="text-lg font-semibold">카메라 준비 중...</p>
                <p className="text-sm text-gray-300">
                  카메라와 마이크 권한을 허용해주세요
                </p>
              </div>
            </div>
          )}

          {/* 오류 발생 시 표시 */}
          {streamError && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-purple-900 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <VideoOff className="h-12 w-12" />
                </div>
                <p className="text-lg font-semibold">카메라 오류</p>
                <p className="text-sm text-gray-300 max-w-md">{streamError}</p>
              </div>
            </div>
          )}

          {/* Live Badge and Connection Status */}
          {isLive && (
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
                onClick={toggleMute}
                disabled={!mediaStream}
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
                disabled={!mediaStream}
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
