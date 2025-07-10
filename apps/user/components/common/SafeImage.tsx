import React from 'react';
import Image, { ImageProps } from 'next/image';

/**
 * HTTP URL을 HTTPS로 변환하여 안전하게 이미지를 표시하는 컴포넌트
 * Next.js Image 컴포넌트를 확장함
 */
export default function SafeImage({ src, alt, ...props }: ImageProps) {
  // HTTP URL 처리 함수
  const getSafeImageUrl = (url: string | undefined | null): string => {
    if (!url) {
      return '/defaultProfile.png';
    }
    
    // HTTP URL인 경우 프록시 API를 통해 처리
    if (typeof url === 'string' && url.startsWith('http:')) {
      return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    }
    
    // 이미 HTTPS URL이거나 상대 경로인 경우 그대로 반환
    return url.toString();
  };

  // 안전한 URL로 변환하여 Image 컴포넌트 렌더링
  return <Image src={getSafeImageUrl(src as string)} alt={alt || ''} {...props} />;
}
