import { UseModal } from '@/context/ModalContext';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';
import { UseChat } from '@/context/ChatContext';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <UseModal>
      <UseChat>
        <CommentDrawer>{children}</CommentDrawer>
      </UseChat>
    </UseModal>
  );
}
