export type ChatContextType = {
    showEmojibox: boolean;
    toggleShowEmojibox: () => void;
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>
};