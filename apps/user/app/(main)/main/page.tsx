import { videoSlideData } from '@/data/carouselData';
import FullscreenCarousel from '@/components/common/carousel/FullscreenCarousel';
import MainHeader from '@/components/common/layouts/header/MainHeader';

export default function page() {
  const DummyData = videoSlideData;
  return (
    <main>
      <MainHeader />
      <FullscreenCarousel data={DummyData} />
    </main>
  );
}
