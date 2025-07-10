'use client';

import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ReelsUrlDataType } from '@/types/ResponseDataTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { Pagination } from 'swiper/modules';
import { Maximize, Volume2, VolumeX } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui/button';
import ReelsModal from '../modal/ReelsModal';

export default function FullscreenSwiper({
  data,
}: {
  data: ReelsUrlDataType[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [bgVideoSrc, setBgVideoSrc] = useState('');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  useEffect(() => {
    const currentItem = data[activeIndex];
    if (currentItem?.realsUrl) {
      const video = document.createElement('video');
      video.src = currentItem.realsUrl;
      video.onloadeddata = () => {
        setBgVideoSrc(currentItem.realsUrl);
      };
    }
  }, [activeIndex, data]);

  const setVideoRef = useCallback((index: number) => {
    return (el: HTMLVideoElement | null) => {
      videoRefs.current[index] = el;
    };
  }, []);

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleSlideClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const handleVideoEnded = () => {
    if (!swiperInstance) return;
    if (swiperInstance.isEnd) {
      swiperInstance.slideTo(0);
    } else {
      swiperInstance.slideNext();
    }
  };

  // 최대화 버튼 클릭 시 현재 활성화된 동영상 인덱스 전달
  const handleMaximizeClick = useCallback((e: React.MouseEvent, id: string, index: number) => {
    e.stopPropagation();
    console.log(`Opening modal for video id: ${id}, index: ${index}`);
    // 현재 활성화된 비디오 인덱스와 ID 저장
    setOpenModalId(id);
  }, []);

  const handleToggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <section className="w-full min-h-screen overflow-hidden relative pt-26">
      {bgVideoSrc && (
        <video
          ref={bgVideoRef}
          key={bgVideoSrc}
          src={bgVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="fixed w-screen h-screen object-cover top-0 left-0 -z-10 brightness-20 transition-opacity duration-500"
        />
      )}
      <Swiper
        slidesPerView={'auto'}
        centeredSlides
        spaceBetween={14}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="flex items-center w-full relative"
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          bulletClass:
            'inline-block w-2 h-2 mx-1 rounded-full bg-white/50 transition-all duration-300',
          bulletActiveClass: 'bg-white w-4 rounded-2xl',
        }}
        modules={[Pagination]}
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={item.realsId}
            style={{ width: '250px', height: '400px' }}
            className={`rounded-2xl overflow-hidden transition-all duration-300 relative bg-black/30 backdrop-blur-sm cursor-pointer
              ${activeIndex === index ? 'scale-100 shadow-lg' : 'scale-90 opacity-50'}
            `}
            onClick={() => activeIndex !== index && handleSlideClick(index)}
          >
            {activeIndex === index ? (
              <>
                <video
                  ref={setVideoRef(index)}
                  src={item.realsUrl}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-transparent text-white"
                    onClick={handleToggleMute}
                  >
                    {isMuted ? (
                      <VolumeX style={{ width: '30px', height: '30px' }} />
                    ) : (
                      <Volume2 style={{ width: '30px', height: '30px' }} />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-transparent text-white"
                    onClick={(e) => handleMaximizeClick(e, item.realsId, index)}
                  >
                    <Maximize style={{ width: '30px', height: '30px' }} />
                  </Button>
                </div>
              </>
            ) : (
              <Image
                src={item.realsThumbnailUrl}
                alt="썸네일"
                fill
                className="object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-4">
        <div className="swiper-pagination"></div>
      </div>

      {/* 유효한 비디오 데이터만 사용 */}
      {(() => {
        // 유효한 동영상만 필터링
        const validVideos = data
          .filter((item) => item.realsUrl && item.realsUrl.trim() !== '')
          .map((item) => ({
            id: item.realsId,
            url: item.realsUrl,
            thumbnail: item.realsThumbnailUrl,
          }));
        
        // 클릭된 비디오 인덱스 찾기
        let initialIndex = 0;
        
        if (openModalId) {
          // 1. 클릭된 ID와 일치하는 유효한 비디오 찾기
          const clickedIndex = validVideos.findIndex((video) => video.id === openModalId);
          
          if (clickedIndex !== -1) {
            initialIndex = clickedIndex;
            console.log(`Found video at index ${clickedIndex} with id ${openModalId}`);
          } else {
            // 2. 현재 활성화된 비디오 사용
            initialIndex = activeIndex;
            console.log(`Using active index ${activeIndex} as fallback`);
          }
        }
        
        return (
          <ReelsModal
            open={openModalId !== null}
            onClose={() => setOpenModalId(null)}
            videos={validVideos}
            initialIndex={initialIndex}
          />
        );
      })()}
      
    </section>
  );
}
