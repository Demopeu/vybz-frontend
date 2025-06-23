'use client';

import { Button } from '@repo/ui/components/ui/button';
import { CategoryData } from '@/data/categoryData';
import { FormContext } from '@/context/FormContext';
import { use } from 'react';
import { Category } from '@/types/ConstextTypes';

export default function CategoryBox() {
  const { artistGenre, setArtistGenre } = use(FormContext);

  return (
    <section>
      <label className="block text-blue-300 text-lg font-semibold mb-2">
        장르 선택
      </label>
      <div className="grid grid-cols-3 gap-2">
        {CategoryData.filter((category) => category.name !== 'All').map(
          (category) => (
            <Button
              key={category.id}
              variant="outline"
              type="button"
              size="sm"
              data-selected={artistGenre === category.name}
              className="border-gray-600 text-gray-300 hover:bg-blue-300 hover:text-gray-900 data-[selected=true]:bg-blue-300 data-[selected=true]:text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap px-1"
              title={category.name}
              onClick={(e) => {
                e.stopPropagation();
                setArtistGenre(
                  artistGenre === category.name
                    ? ''
                    : (category.name as Category)
                );
              }}
            >
              {category.name}
            </Button>
          )
        )}
      </div>
    </section>
  );
}
