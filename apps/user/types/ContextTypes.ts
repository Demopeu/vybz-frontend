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
};
