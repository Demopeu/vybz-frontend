import EditSection from '@/components/about/EditSection';
import MobileSection from '@/components/about/MobileSection';
import { UseForm } from '@/context/FormContext';

export default function page() {
  return (
    <main className="flex space-x-8 justify-between items-start px-20 py-14">
      <UseForm
        initialData={{
          name: '카리나',
          genre: 'Music',
          description: '카리나는 음악을 사랑하는 가수입니다.',
          profileImage: '/buskerUrl.jpg',
        }}
      >
        <MobileSection className="flex-1" />
        <EditSection className="flex-1" />
      </UseForm>
    </main>
  );
}
