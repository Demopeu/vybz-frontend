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
      <div className="relative w-8 h-8 shrink-0">
        <Image
          src="/buskerUrl.jpg"
          alt="user avatar"
          fill
          className="rounded-full object-cover"
        />
      </div>
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
