export type ChatContextType = {
  showEmojibox: boolean;
  toggleShowEmojibox: () => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
};

export type ChatRoomContextType = {
  buskerUuid: string | null;
  setBuskerUuid: React.Dispatch<React.SetStateAction<string | null>>;
  userUuid: string | null;
  setUserUuid: React.Dispatch<React.SetStateAction<string | null>>;
  chatRoomId: string | null;
  setChatRoomId: React.Dispatch<React.SetStateAction<string | null>>;
  messages: import('@/types/ResponseDataTypes').ChatMessageType[];
  addMessage: (newMessage: import('@/types/ResponseDataTypes').ChatMessageType) => void;
  addMessages: (newMessages: import('@/types/ResponseDataTypes').ChatMessageType[]) => void;
  clearMessages: () => void;
  updateMessageReadStatus: (messageId: string, isRead: boolean) => void;
  updateMultipleMessagesReadStatus: (messageIds: string[], isRead: boolean) => void;
};

export type ModalContextType = {
  isOpen: boolean;
  feedId: string;
  open: (feedId: string) => void;
  close: () => void;
  ModalType: 'image' | 'video' | null;
  setModalType: React.Dispatch<React.SetStateAction<'image' | 'video' | null>>;
};
