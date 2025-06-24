'use client';

import { Button } from '@repo/ui/components/ui/button';
import { CategoryData } from '@/data/categoryData';
import { FormContext } from '@/context/FormContext';
import { use } from 'react';

export default function CategoryBox() {
  const { artistGenre, setArtistGenre } = use(FormContext);

  const isSelected = (categoryId: number) => {
    return artistGenre.includes(categoryId);
  };

  const toggleCategory = (categoryId: number) => {
    if (categoryId === 1) return; // Skip 'All' category

    const newGenres = artistGenre.includes(categoryId)
      ? artistGenre.filter((id) => id !== categoryId)
      : [...artistGenre, categoryId];

    setArtistGenre(newGenres);
  };

  return (
    <section>
      <label className="block text-blue-300 text-lg font-semibold mb-2">
        장르 선택
      </label>
      <div className="grid grid-cols-3 gap-2">
        {CategoryData.filter((category) => category.id !== 1).map(
          (category) => (
            <Button
              key={category.id}
              variant="outline"
              type="button"
              size="sm"
              data-selected={isSelected(category.id)}
              className="border-gray-600 text-gray-300 hover:bg-blue-300 hover:text-gray-900 data-[selected=true]:bg-blue-300 data-[selected=true]:text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap px-1"
              title={category.name}
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
            </Button>
          )
        )}
      </div>
    </section>
  );
}
