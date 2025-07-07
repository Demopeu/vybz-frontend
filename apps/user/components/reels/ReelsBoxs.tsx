'use client';

import { Button } from '@repo/ui/components/ui/button';
import { MessageCircle, Send } from '@repo/ui/components/icons';
import { formatNumberToKm } from '@/utils/format';
import Link from 'next/link';
import { HeartButton } from '@/components/common/button/HeartButton';
import { use } from 'react';
import { ModalContext } from '@/context/ModalContext';
import { useState } from 'react';

export default function ReelsBoxs({
  likeCount: initialLikeCount,
  reelsCommentCount,
  feedId,
  buskerUuid,
}: {
  likeCount: number;
  reelsCommentCount: number;
  feedId: string;
  buskerUuid: string;
}) {
  const { open } = use(ModalContext);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLikeChange = (liked: boolean) => {
    setLikeCount((prevCount) =>
      liked ? prevCount + 1 : Math.max(0, prevCount - 1)
    );
    console.log('좋아요 상태 변경:', liked);
  };

  return (
    <div className="absolute bottom-44 right-5 z-20 text-center text-white">
      <HeartButton
        itemId={feedId}
        itemType="reels"
        writerUuid={buskerUuid}
        writerType="BUSKER"
        initialLiked={false}
        onLikeChange={handleLikeChange}
      />
      <p>{formatNumberToKm(likeCount)}</p>

      <Button
        className="w-12 h-12 border-none bg-transparent [&_svg]:size-10 p-0 mt-2"
        onClick={() => open(feedId)}
      >
        <MessageCircle className="fill-none stroke-white stroke-2" />
      </Button>
      <p>{formatNumberToKm(reelsCommentCount)}</p>

      <Link
        href="/chat/list"
        className="w-12 h-12 border-none bg-transparent [&_svg]:size-10 mt-3 inline-block"
      >
        <Send className="fill-none stroke-white stroke-2" />
      </Link>
    </div>
  );
}
