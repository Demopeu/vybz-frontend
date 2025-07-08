'use client';

import { useRef, useEffect, useState } from 'react';

export default function VideoBackgroundWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setVideoLoaded(true);
    const onError = () => setVideoError(true);

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
    };
  }, []);

  const fallbackVisible = videoError || !videoLoaded;

  return (
    <main
      className={`relative w-full h-full min-h-screen overflow-hidden ${className ?? ''}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full z-[-1] transition-opacity duration-700 ${
          fallbackVisible
            ? 'opacity-100 bg-gradient-to-br from-gray-900 to-gray-700'
            : 'opacity-0'
        }`}
      />
      <video
        ref={videoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover z-[-2] transition-opacity duration-700 ${
          videoLoaded && !videoError ? 'opacity-100 brightness-50' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/background/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10">{children}</div>
    </main>
  );
}
