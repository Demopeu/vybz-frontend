'use client';

import Image from 'next/image';
import { Maximize, Volume2, VolumeX } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui/button';
import { useState } from 'react';

type Props = {
  isActive: boolean;
  thumbnailSrc: string;
  videoSrc: string;
};

export default function VideoSlideBox({
  isActive,
  thumbnailSrc,
  videoSrc,
}: Props) {
  const [muted, setMuted] = useState(false);

  if (isActive)
    return (
      <div className="w-full h-full relative">
        <video
          src={videoSrc}
          autoPlay
          muted={muted}
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setMuted((prev) => !prev);
            }}
            className=" text-white"
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              const videoEl = e.currentTarget
                .closest('div')
                ?.querySelector('video');
              if (videoEl?.requestFullscreen) videoEl.requestFullscreen();
            }}
            className=" text-white"
          >
            <Maximize />
          </Button>
        </div>
      </div>
    );

  return (
    <Image
      src={thumbnailSrc}
      alt="썸네일"
      fill
      style={{ objectFit: 'cover' }}
      priority
    />
  );
}
