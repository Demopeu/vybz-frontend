import MainHeader from '@/components/common/layouts/header/MainHeader';
import FullscreenCarousel from '@/components/common/carousel/FullscreenCarousel';
import CategoryBar from '@/components/common/navbar/CategoryBar';

import { videoSlideData } from '@/data/carouselData';
import { CategoryData } from '@/data/categoryData';

export default function page() {
  const DummyData = videoSlideData;
  const DummyCategoryData = CategoryData;
  return (
    <main>
      <MainHeader />
      <FullscreenCarousel data={DummyData} />
      <CategoryBar categories={DummyCategoryData} />
    </main>
  );
}
