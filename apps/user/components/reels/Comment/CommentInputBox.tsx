'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CommentInputBox({
  onSubmit,
}: {
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <div className="border-t border-gray-200 px-3 py-2 flex items-center gap-2">
      <Image
        src="/my-avatar.jpg"
        alt="my profile"
        width={32}
        height={32}
        className="rounded-full"
      />
      <input
        className="flex-1 text-sm p-2 bg-transparent outline-none"
        placeholder="댓글을 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
    </div>
  );
}
