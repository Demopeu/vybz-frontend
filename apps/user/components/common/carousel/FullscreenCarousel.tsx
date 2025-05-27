'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@repo/ui/components/ui/carousel';
import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { VideoCarouselDataType } from '@/types/ResponseDataTypes';
import VideoSlideBox from '@/components/common/carousel/Slide/VideoSlideBox ';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function FullscreenCarousel({
  data,
}: {
  data: VideoCarouselDataType[];
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [slideScales, setSlideScales] = useState<number[]>([1]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = data[selectedIndex]?.videoSrc;

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setSelectedIndex(index);
    };

    const onScroll = () => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();

      const newScales = engine.slideIndexes.map((index) => {
        const snap = engine.scrollSnapList[index];
        if (snap === undefined) return 0.75;
        const diff = Math.abs(scrollProgress - snap);
        const scale = 1.1 - Math.min(diff * 2, 1) * 0.35;
        return scale;
      });

      setSlideScales(newScales);
    };

    api.on('select', onSelect);
    api.on('scroll', onScroll);

    api.scrollTo(0);
    onSelect();
    onScroll();

    return () => {
      api.off('select', onSelect);
      api.off('scroll', onScroll);
    };
  }, [api]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [selectedIndex]);

  const handleClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="w-full min-h-screen overflow-hidden">
      <div className="w-full max-w-2xl mx-auto mt-10">
        <Swiper spaceBetween={20} slidesPerView={1} loop>
          <SwiperSlide>
            <div className="bg-red-500 text-white text-center py-20 rounded-xl">
              Slide 1
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-blue-500 text-white text-center py-20 rounded-xl">
              Slide 2
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-green-500 text-white text-center py-20 rounded-xl">
              Slide 3
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {currentVideo && (
        <video
          ref={videoRef}
          src={currentVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover brightness-50 -z-20"
        />
      )}

      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: false,
        }}
        className="w-full mt-20 relative z-30"
      >
        <CarouselContent className="py-10">
          {data.map((item, index) => {
            const isActive = index === selectedIndex;
            const isFirst = index === 0;
            const isLast = index === data.length - 1;
            const scale = slideScales[index] ?? 0.75;

            return (
              <CarouselItem
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={cn(
                  'transition-transform duration-200 ease-out flex-shrink-0 basis-2/3 cursor-pointer h-96',
                  isFirst && 'ml-16',
                  isLast && 'mr-16'
                )}
                onClick={() => handleClick(index)}
              >
                <div
                  className="h-full w-full overflow-hidden rounded-2xl transition-transform duration-200"
                  style={{
                    transform: `scale(${scale})`,
                    zIndex: isActive ? 20 : 10,
                    opacity: isActive ? 1 : 0.6,
                  }}
                >
                  <VideoSlideBox
                    isActive={isActive}
                    thumbnailSrc={item.thumbnailSrc}
                    videoSrc={item.videoSrc}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <div className="flex gap-2 w-fit mx-auto pt-1 z-30 relative">
        {data.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={() => handleClick(index)}
            className={cn(
              'w-3 h-3 rounded-full p-0',
              index === selectedIndex ? 'bg-white' : 'bg-gray-500'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
