'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { CategoryData, categoryColors } from '@/data/categoryData';
import { useEffect, useState } from 'react';
import { getBuskerCategories } from '@/services/info-services/BuskerCategoryServices';

interface BuskerCategorySectionProps {
  buskerUuid: string;
}

export function BuskerCategorySection({ buskerUuid }: BuskerCategorySectionProps) {
  const [categories, setCategories] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getBuskerCategories(buskerUuid);
        if (response.isSuccess) {
          const categoryIds = response.result.map(cat => cat.categoryId);
          setCategories(categoryIds);
        }
      } catch (error) {
        console.error('Failed to fetch busker categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (buskerUuid) {
      fetchCategories();
    }
  }, [buskerUuid]);

  const getCategoryName = (id: number) => {
    const category = CategoryData.find((cat) => cat.id === id);
    return category?.name || 'ETC';
  };

  const getCategoryColor = (categoryName: string) => {
    return categoryColors[categoryName] || categoryColors['default'];
  };

  if (isLoading) {
    return (
      <section className="space-y-6">
        <h3 className="text-blue-300 font-semibold mb-3 text-lg">장르</h3>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
        </div>
      </section>
    );
  }

  const filteredCategories = categories.filter((id: number) => id !== 1); // Filter out 'All' category

  return (
    <section className="space-y-6">
      <h3 className="text-blue-300 font-semibold mb-3 text-lg">장르</h3>
      <div className="flex flex-wrap gap-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((categoryId: number) => {
            const categoryName = getCategoryName(categoryId);
            return (
              <Badge
                key={categoryId}
                className={`text-white ${getCategoryColor(categoryName)}`}
              >
                {categoryName}
              </Badge>
            );
          })
        ) : (
          <p className="text-gray-400 text-sm">선택된 장르가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
