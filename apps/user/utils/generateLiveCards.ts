import { LiveStreamItem } from '@/services/live-services/live-services';

// 버스커 닉네임 목록
const buskerNicknames = [
  '카리나',
  '윈터',
  '닝닝',
  '지젤',
  '태연',
  '아이유',
  '제니',
  '로제',
  '리사',
  '윤아',
];

type EnrichedLiveStreamItem = LiveStreamItem & {
  buskerNickname?: string;
};

export function generateLiveCards(startIndex: number, count = 6): EnrichedLiveStreamItem[] {
  return Array.from({ length: count }).map((_, idx) => {
    const i = startIndex + idx + 1;
    const buskerIndex = (startIndex + idx) % buskerNicknames.length;
    return {
      streamKey: `stream-key-${i}`,
      title: `${buskerNicknames[buskerIndex]}의 라이브 방송`,
      buskerUuid: `busker-uuid-${i}`,
      thumbnailUrl: `/default-thumbnail.jpg`,
      viewerCount: Math.floor(Math.random() * 1000) + 100, // 최소 100명부터 시작
      liveStreamStatus: 'LIVE',
      startedAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60)).toISOString(), // 최대 1시간 전부터 시작
      membership: i % 2 === 0,
      buskerNickname: buskerNicknames[buskerIndex],
    };
  });
}