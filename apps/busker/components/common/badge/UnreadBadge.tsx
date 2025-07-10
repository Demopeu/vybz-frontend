import React from 'react';

type UnreadBadgeProps = {
  count: number;
};

export default function UnreadBadge({ count }: UnreadBadgeProps) {
  if (count <= 0) return null;

  return (
    <div className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full">
      {count > 9 ? '9+' : count}
    </div>
  );
}
