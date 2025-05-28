'use client';

import LiveCard from './LiveCard';
import type { LiveCardType } from '@/types/LiveCardType';

export default function LiveCardList({ lives }: { lives: LiveCardType[] }) {
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
