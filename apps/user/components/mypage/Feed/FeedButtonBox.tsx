import { HeartButton } from '@/components/common/button/HeartButton';
import { Button } from '@repo/ui/components/ui/button';
import { MessageCircle } from '@repo/ui/components/icons';

export default function FeedButtonBox({
  likesCount,
  commentsCount,
}: {
  likesCount: number;
  commentsCount: number;
}) {
  return (
    <div className="flex justify-end space-x-2 items-center text-white">
      <HeartButton className="-mr-2 [&_svg]:size-4" />
      <p>{likesCount}</p>
      <Button className="border-none bg-transparent p-0 [&_svg]:size-6">
        <MessageCircle className="fill-none stroke-white stroke-2 -mr-1" />
        <p>{commentsCount}</p>
      </Button>
    </div>
  );
}
