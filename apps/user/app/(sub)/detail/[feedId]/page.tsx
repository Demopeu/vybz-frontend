import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';
import { MessageCircle } from '@repo/ui/components/icons';
// import ChatDmBar from '@/components/chat/rooms/ChatDmBar';
// import { getServerSession } from 'next-auth';
// import { options } from '@/app/api/auth/[...nextauth]/options';
// import { UseChat } from '@/context/ChatContext';
import DetailHeader from '@/components/common/layouts/header/DetailHeader';
import CommentList, { Comment } from '@/components/detail/CommentList';

export default async function page() {
  // const session = await getServerSession(options);
  // const userUuid = session?.user?.userUuid;

  const comments: Comment[] = [
    {
      id: 1,
      username: 'john_doe',
      text: 'Amazing shot! 📸',
      time: '2h',
      likes: 12,
    },
    {
      id: 2,
      username: 'sarah_kim',
      text: 'Love this vibe ✨',
      time: '1h',
      likes: 8,
    },
    {
      id: 3,
      username: 'mike_photo',
      text: 'What camera did you use for this?',
      time: '45m',
      likes: 3,
    },
  ];

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Post Content */}
      <div className="flex-1 overflow-y-auto">
        <DetailHeader username="john_photographer" location="" avatarUrl="" />

        {/* Image */}
        <div className="aspect-square bg-gray-900 relative">
          <Image
            src="/busker.jpg"
            alt="Post image"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 p-0"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
          {/* Time */}
          <div className="px-4 py-2">
            <span className="text-gray-400 text-xs">3시간 전</span>
          </div>
        </div>

        {/* Likes */}
        <div className="px-4 pb-2">
          <span className="font-semibold text-sm">1,234개의 좋아요</span>
        </div>

        {/* Caption */}
        <div className="px-4 pb-2">
          <span className="font-semibold text-sm mr-2">john_photographer</span>
          <span className="text-sm">
            Beautiful sunset at Hangang Park 🌅 Perfect evening for photography!
            <span className="text-blue-400">
              {' '}
              #seoul #photography #sunset #hangang
            </span>
          </span>
        </div>

        {/* View Comments */}
        <div className="px-4 pb-2">
          <button className="text-gray-400 text-sm">
            댓글 {comments.length}개 모두 보기
          </button>
        </div>

        {/* Comments */}
        <div className="px-4">
          <CommentList comments={comments} />
        </div>
      </div>
      {/* <UseChat>
        <ChatDmBar userUuid={userUuid || ''} />
      </UseChat> */}
    </div>
  );
}
