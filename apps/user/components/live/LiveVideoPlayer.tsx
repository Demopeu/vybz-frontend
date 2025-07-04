'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface LiveVideoPlayerProps {
  streamUrl: string;
  className?: string;
}

export default function LiveVideoPlayer({
  streamUrl,
  className = '',
}: LiveVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;

    let hls: Hls;

    const setupHls = () => {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          fragLoadingTimeOut: 60000,
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
            .catch(error => {
              console.error('자동 재생 실패:', error);
            });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          console.error('HLS 에러:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                // 네트워크 에러 발생 시 재시도
                console.log('네트워크 에러, 재연결 시도 중...');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('미디어 에러, 복구 시도 중...');
                hls.recoverMediaError();
                break;
              default:
                // 복구 불가능한 에러
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
        video.addEventListener('loadedmetadata', () => {
          video.play()
            .catch(error => {
              console.error('자동 재생 실패:', error);
            });
        });
      }
    };

    setupHls();

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, [streamUrl]);

  return (
    <div className={`relative w-full ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        controls
        playsInline
        autoPlay
        muted
      />
    </div>
  );
}
