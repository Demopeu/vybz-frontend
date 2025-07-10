'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Heart } from '@repo/ui/components/icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';

export interface Comment {
  id: number;
  username: string;
  text: string;
  time: string;
  likes: number;
}

interface CommentListProps {
  comments: Comment[];
  className?: string;
}

export default function CommentList({
  comments: initialComments,
  className = '',
}: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleLike = (commentId: number, e: React.MouseEvent) => {
    e.preventDefault();
    
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );

    // TODO: API 호출로 서버에 좋아요 반영
    console.log('Liked comment:', commentId);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
            <AvatarFallback className="bg-gray-700 text-white text-xs">
              {comment.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">{comment.username}</span>
              <span className="text-sm">{comment.text}</span>
            </div>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-gray-400 text-xs">{comment.time}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:bg-gray-800 h-6 w-6"
            onClick={(e) => handleLike(comment.id, e)}
          >
            <Heart className={`h-3 w-3 ${comment.likes > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      ))}
    </div>
  );
}
