import { ChatMessage, LiveStreamData } from '@/types/live';

// 초기 채팅 메시지 더미 데이터
export const initialChatMessages: ChatMessage[] = [
  {
    id: '1',
    username: '음악러버',
    message: '와 진짜 잘하시네요! 👏',
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: '2',
    username: '거리음악팬',
    message: '이 노래 제목이 뭐예요?',
    timestamp: new Date(Date.now() - 25000),
  },
  {
    id: '3',
    username: '후원왕',
    message: '후원 보냈어요! 화이팅! 💝',
    timestamp: new Date(Date.now() - 20000),
    isSupporter: true,
  },
  {
    id: '4',
    username: '신입팬',
    message: '처음 보는데 정말 멋져요!',
    timestamp: new Date(Date.now() - 15000),
  },
  {
    id: '5',
    username: '단골시청자',
    message: '오늘도 좋은 음악 감사해요 🎵',
    timestamp: new Date(Date.now() - 10000),
  },
];

// 랜덤 메시지 및 사용자 이름 샘플
export const randomMessages = [
  '멋진 연주네요! 🎸',
  '다음 곡도 기대돼요',
  '목소리가 정말 좋아요',
  '라이브 최고! 👍',
  '후원 보냈습니다!',
  '매일 들으러 와요',
  '친구들한테 추천할게요',
];

export const randomUsernames = [
  '음악애호가',
  '거리예술팬',
  '멜로디러버',
  '하모니킹',
  '리듬마스터',
  '뮤직헌터',
  '사운드메이커',
];

// 현재 라이브 스트림 더미 데이터
export const currentLiveStream: LiveStreamData = {
  id: 'live-001',
  title: '거리의 음유시인',
  description: '🎵 오늘은 어쿠스틱 기타와 함께 감성적인 곡들을 준비했습니다. 여러분의 신청곡도 받고 있으니 채팅으로 남겨주세요!',
  buskerName: '거리의 음유시인',
  buskerProfileImage: '/placeholder.svg',
  isLive: true,
  tags: ['어쿠스틱', '라이브음악', '버스킹', '감성'],
  viewerCount: 1247,
  likeCount: 89,
};
