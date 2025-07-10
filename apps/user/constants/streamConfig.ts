// 스트림 서버 설정
export const STREAM_SERVER_URL = process.env.NEXT_PUBLIC_STREAM_SERVER_URL || 'http://13.124.91.96:8090';

// HLS 스트림 URL 생성 함수
export function getHlsStreamUrl(streamKey: string): string {
  return `${STREAM_SERVER_URL}/hls/${streamKey}.m3u8`;
}
