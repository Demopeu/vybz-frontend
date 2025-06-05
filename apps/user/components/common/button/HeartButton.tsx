'use client';

import { Heart } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function HeartButton() {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked((prev) => !prev);
  };

  return (
    <Button
      onClick={handleClick}
      className="w-12 h-12 border-none bg-transparent p-0 relative [&_svg]:size-10 "
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
          className={`w-10 h-10 transition-colors duration-300 ${
            liked
              ? 'fill-red-500 text-red-500'
              : 'fill-none stroke-white stroke-2'
          }`}
        />
      </motion.div>
    </Button>
  );
}
