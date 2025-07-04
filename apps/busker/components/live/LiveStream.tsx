'use client';

import { useState, useRef, useEffect } from 'react';
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // 비디오 스트림 시작
  useEffect(() => {
    async function setupMediaStream() {
      if (isLive) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true,
            audio: true
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setMediaStream(stream);
          setStreamError(null);
        } catch (error) {
          console.error('미디어 스트림 가져오기 실패:', error);
          setStreamError(
            error instanceof DOMException && error.name === 'NotFoundError' 
              ? '카메라 또는 마이크를 찾을 수 없습니다. 장치가 연결되어 있고 권한이 허용되어 있는지 확인하세요.'
              : error instanceof DOMException && error.name === 'NotAllowedError'
                ? '카메라 및 마이크 사용 권한이 거부되었습니다.'
                : '미디어 스트림을 시작할 수 없습니다.'
          );
        }
      }
    }

    setupMediaStream();

    return () => {
      // 컴포넌트 언마운트 시 미디어 스트림 정리
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isLive, mediaStream]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };
  
  // 비디오 ON/OFF 토글
  const toggleVideo = () => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !isVideoOn;
      });
      setIsVideoOn(!isVideoOn);
    }
  };
  
  // 오디오 음소거 토글
  const toggleMute = () => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      audioTracks.forEach(track => {
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
                <p className="text-sm text-gray-300 max-w-md">
                  {streamError}
                </p>
              </div>
            </div>
          )}

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
