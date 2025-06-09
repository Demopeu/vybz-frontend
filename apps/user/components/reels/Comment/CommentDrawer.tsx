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
            <div className="fixed inset-0 bg-black/40 z-50" onClick={close} />
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) {
                  close();
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 w-full h-11/12 bg-white rounded-t-2xl shadow-xl z-50 flex flex-col font-poppins"
            >
              <div className="w-12 h-1.5 mt-2 mx-auto bg-gray-300 rounded-full" />

              <div className="text-center px-4 py-4 border-b">
                <p className="font-bold text-lg">댓글</p>
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
