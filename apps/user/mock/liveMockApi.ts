import type { LiveCardType } from '@/types/LiveCardType';

export function generateLiveCards(offset: number): LiveCardType[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `live-${offset + i + 1}`,
    title: `공연 ${offset + i + 1}의 제목`,
    nickname: `공연자 ${offset + i + 1}`,
    imageUrl: '/sample.jpg',
    membership: (offset + i) % 2 === 0, // 예시로 짝수는 멤버십 보유
  }));
}
