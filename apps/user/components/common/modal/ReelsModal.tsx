'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';
import { X, ChevronLeft, ChevronRight } from '@repo/ui/components/icons';

interface ReelsModalProps {
  open: boolean;
  onClose: () => void;
  videos: {
    id: string;
    url: string;
    thumbnail?: string;
  }[];
  initialIndex?: number;
}

// VideoPlayer 컴포넌트
interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
}

function VideoPlayer({ videoUrl, posterUrl }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoading(true);
  }, [videoUrl]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10">
          <div className="relative w-100 h-100 mb-4">
            <Image
              src="/logo/logo.png"
              alt="로고"
              fill
              className="object-contain opacity-50"
            />
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        className="max-h-full max-w-full object-contain"
        autoPlay
        playsInline
        loop
        onLoadedData={() => setIsLoading(false)}
        // 사용자 정의 컨트롤 사용
        controlsList="nodownload"
        controls
      />
    </div>
  );
}

export default function ReelsModal({
  open,
  onClose,
  videos,
  initialIndex = 0,
}: ReelsModalProps) {
  // currentIndex를 ref로 관리하여 초기화 문제 해결
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // 초기화 인덱스 변경 시 현재 인덱스 업데이트
  useEffect(() => {
    if (open && initialIndex >= 0 && initialIndex < videos.length) {
      setCurrentIndex(initialIndex);
      console.log('ReelsModal: Setting to index', initialIndex);
    }
  }, [initialIndex, open, videos.length]);

  const goToNext = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 마지막에서 첫 번째로 순환
      setCurrentIndex(0);
    }
  }, [currentIndex, videos.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // 첫 번째에서 마지막으로 순환
      setCurrentIndex(videos.length - 1);
    }
  }, [currentIndex, videos.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, goToPrevious, goToNext]);

  // 모달이 닫혔다 다시 열릴 때 initialIndex가 제대로 적용되도록 추가
  useEffect(() => {
    if (open) {
      console.log('Modal opened with index:', initialIndex);
    }
  }, [open, initialIndex]);

  return (
    <AnimatePresence>
      {open && videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 비디오 컨테이너 */}
            <motion.div
              key={videos[currentIndex]?.id || currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[80vh] max-h-[90vh] h-full flex items-center justify-center"
            >
              {videos[currentIndex]?.url ? (
                <VideoPlayer
                  videoUrl={videos[currentIndex].url}
                  posterUrl={videos[currentIndex].thumbnail}
                />
              ) : (
                <div className="text-white text-xl">
                  비디오를 불러올 수 없습니다
                </div>
              )}
            </motion.div>

            {/* 네비게이션 버튼 */}
            <Button
              onClick={goToPrevious}
              className={`absolute left-6 md:left-12 transform -translate-y-1/2 top-1/2 rounded-full w-12 h-12 text-whitetransition-transform duration-200 [&_svg]:size-10 bg-transparent border-0 `}
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>

            <Button
              onClick={goToNext}
              className="absolute right-6 md:right-12 transform -translate-y-1/2 top-1/2 rounded-full w-12 h-12 bg-transparent text-white transition-transform duration-200 [&_svg]:size-10 border-0"
            >
              <ChevronRight className="h-7 w-7" />
            </Button>

            {/* 닫기 버튼 */}
            <Button
              className="absolute top-6 right-6 rounded-full w-12 h-12 bg-transparent text-white hover:scale-110 transition-all duration-200 border-0 [&_svg]:size-10"
              onClick={onClose}
            >
              <X />
            </Button>

            {/* 프로그레스 인디케이터 */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
              {videos.length > 1 &&
                videos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
