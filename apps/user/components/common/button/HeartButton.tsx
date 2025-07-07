'use client';

import { Heart } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';
import {
  toggleFeedLike,
  toggleCommentLike,
} from '@/services/like-services/like-services';
import { useSession } from 'next-auth/react';

export interface HeartButtonProps {
  className?: string;
  itemId: string; // 피드 ID 또는 댓글 ID
  itemType: 'post' | 'comment' | 'reels' | 'live';
  initialLiked?: boolean;
  writerUuid: string;
  writerType: 'USER' | 'BUSKER';
  parentCommentId?: string; // 댓글인 경우 부모 댓글 ID (대댓글인 경우)
  onLikeChange?: (liked: boolean) => void;
}

export function HeartButton({
  className,
  itemId,
  itemType,
  initialLiked = false,
  writerUuid,
  writerType,
  parentCommentId,
  onLikeChange,
}: HeartButtonProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(initialLiked);
  const [isLoading, setIsLoading] = useState(false);

  // 초기 좋아요 상태가 변경되면 컴포넌트 상태도 업데이트
  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const handleClick = async () => {
    if (!session?.user?.userUuid) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      if (itemType === 'comment') {
        const response = await toggleCommentLike({
          commentId: itemId,
          likerUuid: session.user.userUuid,
          likerType: 'USER',
          writerUuid,
          writerType,
          parentCommentId,
        });

        if (response.isSuccess) {
          setLiked(!liked);
          onLikeChange?.(!liked);
        } else {
          alert(response.message || '좋아요 처리 중 오류가 발생했습니다.');
        }
      } else {
        // 피드 좋아요 (Reels, Post, Live)
        const response = await toggleFeedLike({
          feedId: itemId,
          feedType: itemType.toUpperCase() as 'REELS' | 'POST' | 'LIVE',
          likerUuid: session.user.userUuid,
          likerType: 'USER',
        });

        if (response.isSuccess) {
          setLiked(!liked);
          onLikeChange?.(!liked);
        } else {
          alert(response.message || '좋아요 처리 중 오류가 발생했습니다.');
        }
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류:', error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        'w-12 h-12 border-none bg-transparent p-0 relative [&_svg]:size-9 stroke-white stroke-2',
        className
      )}
    >
      <motion.div
        key={liked ? 'liked' : 'unliked'}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        exit={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Heart
          className={`transition-colors duration-300 ${
            liked ? 'fill-red-500 text-red-500 stroke-none' : 'fill-none'
          }`}
        />
      </motion.div>
    </Button>
  );
}
