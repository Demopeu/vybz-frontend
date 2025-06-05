import { Button } from '@repo/ui/components/ui/button';
import { MessageCircle, Send } from '@repo/ui/components/icons';
import { formatNumberToKm } from '@/utils/format';
import Link from 'next/link';
import { HeartButton } from '@/components/common/button/HeartButton';

export default function ReelsBoxs({
  likeCount,
  reelsCommentCount,
}: {
  likeCount: number;
  reelsCommentCount: number;
}) {
  return (
    <div className="absolute bottom-45 right-5 z-20 text-center text-white">
      <HeartButton />
      <p className="">{formatNumberToKm(likeCount)}</p>
      <Button className="w-12 h-12 border-none bg-transparent [&_svg]:size-10 p-0 mt-2">
        <MessageCircle className="fill-none stroke-white stroke-2" />
      </Button>
      <p className="">{formatNumberToKm(reelsCommentCount)}</p>
      <Link
        href="/chat"
        className="w-12 h-12 border-none bg-transparent [&_svg]:size-10"
      >
        <Send className="fill-none stroke-white stroke-2 mt-3" />
      </Link>
    </div>
  );
}
