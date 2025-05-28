'use client';

import React from 'react';
import LiveCard from './LiveCard';
import type { LiveCardProps } from '../../types/LiveCardType';

type LiveCardListProps = {
  lives: LiveCardProps[];
};

export default function LiveCardList({ lives }: LiveCardListProps) {
  return (
    <section aria-label="Live performers list">
      <ul className="grid grid-cols-3 gap-2">
        {lives.map((live) => (
          <li key={live.id} className="w-30">
            <LiveCard {...live} />
          </li>
        ))}
      </ul>
    </section>
  );
}
