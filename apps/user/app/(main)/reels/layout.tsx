import { UseModal } from '@/context/ModalContext';
import CommentDrawer from '@/components/reels/Comment/CommentDrawer';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <UseModal>
      <CommentDrawer>{children}</CommentDrawer>
    </UseModal>
  );
}
