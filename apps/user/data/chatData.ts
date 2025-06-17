import { ChatListType, ChatListDataType } from '@/types/ResponseDataTypes';

export const dummyChatList: ChatListType[] = [
  {
    chatId: '1',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    lastMessage: '안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요',
    lastMessageTime: '2025-06-17 15:06:15',
    unreadCount: 301,
  },
  {
    chatId: '2',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    lastMessage: '왜 안읽음?',
    lastMessageTime: '2025-06-17 15:06:15',
    unreadCount: 300,
  },
  {
    chatId: '3',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    lastMessage: '왜 안읽음? 2트',
    lastMessageTime: '2025-06-17 15:06:15',
    unreadCount: 2,
  },
  {
    chatId: '4',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    lastMessage: '왜 안읽음? 3트',
    lastMessageTime: '2025-06-17 15:06:15',
    unreadCount: 4,
  },
  {
    chatId: '5',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    lastMessage: '왜 안읽음? 4트',
    lastMessageTime: '2025-06-16 15:06:15',
    unreadCount: 6,
  },
  {
    chatId: '6',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    lastMessage: '읽었네',
    lastMessageTime: '2025-06-15 15:06:15',
    unreadCount: 0,
  },
  {
    chatId: '7',
    buskerName: '카리나',
    buskerProfileImage: '/buskerUrl.jpg',
    lastMessage: '읽었네',
    lastMessageTime: '2025-06-14 15:06:15',
    unreadCount: 0,
  },
];

export const ChatListData: ChatListDataType = {
 data: dummyChatList,
 page: 1,
 totalPages: 10
};