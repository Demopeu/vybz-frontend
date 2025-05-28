import type { LiveCardProps } from '@/types/LiveCardType';

export function generateLiveCards(offset: number): LiveCardProps[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `live-${offset + i + 1}`,
    nickname: `공연자 ${offset + i + 1}`,
    imageUrl: '/sample.jpg',
    likes: 17,
  }));
}
