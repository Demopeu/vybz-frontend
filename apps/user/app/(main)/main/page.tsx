import { videoSlideData } from '@/data/carouselData';
import FullscreenCarousel from '@/components/common/carousel/FullscreenCarousel';

export default function page() {
  const DummyData = videoSlideData;
  return (
    <main>
      <FullscreenCarousel data={DummyData} />
    </main>
  );
}
