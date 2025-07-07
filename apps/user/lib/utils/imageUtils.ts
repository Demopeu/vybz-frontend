/**
 * HTTP URL을 HTTPS로 변환하는 유틸리티 함수
 * HTTP URL인 경우 이미지 프록시 API를 통해 처리
 */
export function getSafeImageUrl(url: string | null | undefined): string {
  // URL이 없거나 비어있는 경우 기본 이미지 반환
  if (!url) {
    return '/defaultProfile.png';
  }
  
  // HTTP URL인 경우 프록시 API를 통해 처리
  if (url.startsWith('http:')) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  
  // 이미 HTTPS URL이거나 상대 경로인 경우 그대로 반환
  return url;
}
