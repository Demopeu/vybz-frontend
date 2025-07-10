'use client';

import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLiveDetail } from '@/api/liveServiceApi';
import type { LiveEnterResult } from '@/api/liveServiceApi';

interface LiveVideoPlayerProps {
  streamKey: string;
  userUuid?: string;
  userAccessToken?: string;
  buskerUuid?: string;
  isHost?: boolean;
  className?: string;
  onStreamEnd?: () => void;
  onError?: (error: string) => void;
}

export default function LiveVideoPlayer({
  streamKey,
  userUuid,
  userAccessToken,
  buskerUuid,
  isHost = false,
  className = '',
  onStreamEnd,
  onError,
}: LiveVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const router = useRouter();

  const [isEnded, setIsEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [live, setLive] = useState<LiveEnterResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 라이브 정보 가져오기
  useEffect(() => {
    if (!streamKey) {
      console.warn('스트림 키가 없습니다');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('라이브 정보 가져오기 시도:', { streamKey, userUuid, hasToken: !!userAccessToken });

        // 라이브 정보 가져오기 (인증 정보 선택적)
        const liveDetail = await getLiveDetail(
          streamKey,
          userUuid,
          userAccessToken
        );
        setLive(liveDetail.result);
        console.log('라이브 정보 가져오기 성공:', liveDetail);
      } catch (error) {
        console.error('라이브 정보 가져오기 실패:', error);
        const errorMessage =
          '라이브 정보를 가져올 수 없습니다. 하지만 스트림은 계속 재생됩니다.';
        setError(null); // 스트림은 계속 보여주기 위해 오류 표시 안 함
        onError?.(errorMessage);
      }
    };

    fetchData();
  }, [streamKey, userUuid, userAccessToken, onError]);

  // WebSocket 연결
  useEffect(() => {
    if (!streamKey) return;

    const connectWebSocket = () => {
      const token = userAccessToken;
      if (!token) {
        console.error('❌ WebSocket 연결 실패: 토큰이 없습니다');
        return;
      }

      const wsUrl = `wss://back.vybz.kr/ws-live/viewer?streamKey=${streamKey}&token=${token}`;
      console.log('WebSocket 연결 중:', wsUrl);

      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('✅ WebSocket 연결 성공!');
      };

      ws.onerror = (error) => {
        console.error('❌ WebSocket 연결 에러:', error);
      };

      ws.onclose = (event) => {
        console.log('🔌 WebSocket 연결 종료:', event.code, event.reason);
      };

      ws.onmessage = (e) => {
        console.log('📨 WebSocket 메시지 수신:', e.data);
        if (e.data === '스트림이 종료되었습니다.') {
          setIsEnded(true);
          onStreamEnd?.();
        }
      };
    };

    // 1초 지연 후 WebSocket 연결 시도
    const timeoutId = setTimeout(connectWebSocket, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [streamKey, userAccessToken, onStreamEnd]);

  // HLS 스트림 설정
  useEffect(() => {
    if (!streamKey || !videoRef.current) return;

    // HLS 서버 URL 설정
    const HLS_SERVER = 'http://13.124.91.96:8090';
    const streamUrl = `${HLS_SERVER}/hls/${streamKey}.m3u8`;
    console.log('HLS 스트림 URL:', streamUrl);
    const video = videoRef.current;
    let hls: Hls;

    // Auto play attempt function
    const tryAutoPlay = async (videoElement: HTMLVideoElement) => {
      try {
        // Step 1: Try muted autoplay
        videoElement.muted = true;
        await videoElement.play();
        console.log('Muted autoplay successful');
        setIsPlaying(true);
        setNeedsUserInteraction(false);
        
        // Try to unmute after user interaction
        const tryUnmute = () => {
          if (videoElement.muted) {
            videoElement.muted = false;
            console.log('Audio unmuted');
          }
        };
        
        // Unmute on user click
        const handleUserInteraction = () => {
          tryUnmute();
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
        };
        
        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });
        
      } catch (error) {
        console.error('Autoplay failed:', error);
        setIsPlaying(false);
        setNeedsUserInteraction(true);
        
        // Wait for user interaction
        const handleUserClick = async () => {
          try {
            videoElement.muted = false;
            await videoElement.play();
            console.log('Play successful after user interaction');
            setIsPlaying(true);
            setNeedsUserInteraction(false);
            document.removeEventListener('click', handleUserClick);
            document.removeEventListener('touchstart', handleUserClick);
          } catch (playError) {
            console.error('Play failed even after user interaction:', playError);
          }
        };
        
        document.addEventListener('click', handleUserClick, { once: true });
        document.addEventListener('touchstart', handleUserClick, { once: true });
      }
    };

    const setupHls = () => {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          fragLoadingTimeOut: 60000,
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, async () => {
          setIsLoading(false);
          await tryAutoPlay(video);
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error('HLS 에러:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('네트워크 에러, 재연결 시도 중...');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('미디어 에러, 복구 시도 중...');
                hls.recoverMediaError();
                break;
              default:
                console.error('복구 불가능한 에러, 플레이어를 초기화합니다.');
                hls.destroy();
                setupHls();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // iOS Safari에서는 네이티브 HLS 재생 사용
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', async () => {
          setIsLoading(false);
          await tryAutoPlay(video);
        });
      }
    };

    // 재시도 횟수 확인을 위한 로컬 변수
    let retryCount = 0;
    const MAX_RETRIES = 5;

    const tryLoad = () => {
      if (retryCount >= MAX_RETRIES) {
        console.error(
          `최대 재시도 횟수(${MAX_RETRIES}회) 도달. 스트림 로드 실패`
        );
        setIsLoading(false);
        setError(
          `스트림을 로드할 수 없습니다. 재접속하거나 나중에 다시 시도해 주세요.`
        );
        return;
      }

      retryCount++;
      console.log(`스트림 로드 시도 ${retryCount}/${MAX_RETRIES}:`, streamUrl);

      fetch(streamUrl)
        .then((res) => {
          if (res.ok) {
            console.log('✅ 스트림 마니페스트 발견!');
            setupHls();
          } else {
            console.warn(
              `❌ 스트림 로드 실패 (${res.status}): ${res.statusText}, 재시도 중...`
            );
            setTimeout(tryLoad, 2000); // 더 긴 재시도 간격
          }
        })
        .catch((err) => {
          console.error(`❌ 스트림 서버 연결 실패:`, err.message || err);
          setTimeout(tryLoad, 2000); // 더 긴 재시도 간격
        });
    };

    tryLoad();

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [streamKey]);

  // 스트림 종료 시 비디오 정리
  useEffect(() => {
    if (isEnded && videoRef.current) {
      const video = videoRef.current;
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }, [isEnded]);

  // 방송 종료 핸들러
  const handleEnd = async () => {
    if (!buskerUuid) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_LIVE_API_URL}/end?streamKey=${streamKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Busker-Id': buskerUuid,
          },
        }
      );
      socketRef.current?.close();
      setIsEnded(true);
      onStreamEnd?.();
    } catch (error) {
      console.error('방송 종료 실패:', error);
      onError?.('방송 종료에 실패했습니다.');
    }
  };

  // 나가기 핸들러
  const handleExit = async () => {
    if (!userUuid) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_LIVE_API_URL}/exit?streamKey=${streamKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': userUuid,
          },
        }
      );
      socketRef.current?.close();
      router.push('/');
    } catch (error) {
      console.error('나가기 실패:', error);
      onError?.('나가기에 실패했습니다.');
    }
  };

  if (error) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-black text-white ${className}`}
      >
        <div className="text-red-400 font-bold text-xl mb-4">⚠️ 오류 발생</div>
        <div className="text-gray-300">{error}</div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col bg-black text-white ${className}`}>
      {/* 라이브 정보 헤더 */}
      <div className="p-4 bg-gray-900">
        <h2 className="text-xl mb-2">
          {isLoading
            ? '방송 정보 불러오는 중...'
            : live
              ? `📺 ${live.title} (시청자 ${live.viewerCount}명)`
              : '방송 정보를 찾을 수 없습니다.'}
        </h2>
        {live && (
          <div className="text-gray-300 text-sm">
            <span>호스트: {live.buskerUuid}</span>
          </div>
        )}
      </div>

      {/* 비디오 플레이어 */}
      <div className="relative flex-1">
        {isEnded ? (
          <div className="flex items-center justify-center h-64 bg-gray-800">
            <div className="text-red-400 font-bold text-2xl">
              🛑 방송이 종료되었습니다
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full h-full object-contain bg-black"
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white text-lg">로딩 중...</div>
              </div>
            )}
            {needsUserInteraction && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
                <div className="text-center">
                  <button
                    onClick={async () => {
                      if (videoRef.current) {
                        try {
                          await videoRef.current.play();
                          setIsPlaying(true);
                          setNeedsUserInteraction(false);
                        } catch (error) {
                          console.error('Manual play failed:', error);
                        }
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold transition-colors flex items-center gap-2"
                  >
                    ▶️ 재생
                  </button>
                  <p className="text-gray-300 mt-4 text-sm">
                    브라우저 정책으로 인해 수동 재생이 필요합니다
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 컨트롤 버튼 */}
      <div className="p-4 bg-gray-900 flex justify-between items-center">
        {!isEnded && !isLoading && (
          <div className="text-sm text-gray-300 mr-2">
            {isPlaying ? '▶️ 재생 중' : '⏸️ 일시 중지됨'}
          </div>
        )}
        {isHost && !isLoading && !isEnded && (
          <button
            onClick={handleEnd}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded text-white font-semibold transition-colors"
          >
            🛑 방송 종료
          </button>
        )}
        {!isHost && !isEnded && (
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors ml-auto"
          >
            ❌ 나가기
          </button>
        )}
      </div>
    </div>
  );
}
