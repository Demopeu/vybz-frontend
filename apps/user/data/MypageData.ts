import { SubscriptionType, FollowingDataType } from '@/types/ResponseDataTypes';

export const subscriptionData: SubscriptionType[] = [
  {
    id: 'sub1',
    name: 'Vocal Vixens',
    months: 14,
    avatarUrl: '/buskerUrl.jpg',
    subscribedSince: '2023-03-15'
  },
  {
    id: 'sub2',
    name: 'The Street Pianos',
    months: 12,
    avatarUrl: '/buskerUrl.jpg',
    subscribedSince: '2023-05-22'
  },
  {
    id: 'sub3',
    name: 'Brass Monkeys',
    months: 10,
    avatarUrl: '/buskerUrl.jpg',
    subscribedSince: '2023-07-10'
  }
];

export const followingData: FollowingDataType[] = [
  {
    buskerId: 'busker1',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg'
  },
  {
    buskerId: 'busker2',
    buskerName: '윈터',
    buskerProfileImage: '/buskerUrl.jpg'
  },
  {
    buskerId: 'busker3',
    buskerName: '닝닝',
    buskerProfileImage: '/buskerUrl.jpg'
  }
];

