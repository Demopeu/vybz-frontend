'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import CommentItem from './CommentItem';
import CommentInputBox from './CommentInputBox';
import { CommentDataType } from '@/types/ResponseDataTypes';
import { CommentsData } from '@/data/CommentData';
import { ModalContext } from '@/context/ModalContext';

export default function CommentDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, close } = use(ModalContext);
  const [comments, setComments] = useState<CommentDataType[]>(CommentsData);

  const handleNewComment = (text: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        username: 'hoon2136',
        avatarUrl: '/my-avatar.jpg',
        text,
        timeAgo: '방금',
        likes: 0,
      },
    ]);
  };

  return (
    <div className="relative">
      {children}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <div
              className="fixed inset-0 bg-black/40 z-[9998]"
              onClick={close}
            />
            {/* 드로어 */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 w-full max-h-[80vh] bg-white rounded-t-2xl shadow-xl z-[9999] flex flex-col"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <span className="font-bold text-lg">댓글</span>
                <button onClick={close} className="text-sm text-gray-500">
                  닫기
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4">
                {comments.map((c) => (
                  <CommentItem key={c.id} {...c} />
                ))}
              </div>

              <CommentInputBox onSubmit={handleNewComment} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
