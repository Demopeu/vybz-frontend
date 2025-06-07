import { CommentDataType } from '@/types/ResponseDataTypes';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CommentItem({
  username,
  avatarUrl,
  text,
  timeAgo,
  likes,
}: CommentDataType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 py-3 border-b border-gray-200"
    >
      <Image
        src={avatarUrl}
        alt={`${username} profile`}
        width={36}
        height={36}
        className="rounded-full"
      />
      <div className="flex-1">
        <div className="text-sm">
          <span className="font-semibold mr-1">{username}</span>
          {text}
        </div>
        <div className="text-xs text-gray-400 mt-1 flex gap-2 items-center">
          <span>{timeAgo}</span>
          <span>❤️</span>
          <span>{likes}</span>
        </div>
      </div>
    </motion.div>
  );
}
