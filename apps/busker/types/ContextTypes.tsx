import { CategoryData } from '@/data/categoryData';
import { ChatMessageType } from './ResponseDataTypes';

export type ChatContextType = {
  showEmojibox: boolean;
  toggleShowEmojibox: () => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
};

export type ModalContextType = {
  isOpen: boolean;
  feedId: string;
  open: (feedId: string) => void;
  close: () => void;
  ModalType: 'image' | 'video' | null;
  setModalType: React.Dispatch<React.SetStateAction<'image' | 'video' | null>>;
};

type CategoryName = (typeof CategoryData)[number]['name'];
export type Category = Exclude<CategoryName, 'All'>;

export type FormContextType = {
  buskerProfileUrl: string;
  setBuskerProfileUrl: (url: string) => void;
  artistName: string;
  setArtistName: (name: string) => void;
  artistGenre: number[];
  setArtistGenre: (genre: number[]) => void;
  artistDescription: string;
  setArtistDescription: (description: string) => void;
};

export type ChatRoomContextType = {
  chatRoomId: string | null;
  setChatRoomId: (id: string | null) => void;
  userUuid: string | null;
  setUserUuid: (uuid: string | null) => void;
  messages: ChatMessageType[];
  addMessage: (newMessage: ChatMessageType) => void;
  addMessages: (newMessages: ChatMessageType[]) => void;
  clearMessages: () => void;
};
