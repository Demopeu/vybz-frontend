import MainFooter from '@/components/common/layout/footer/MainFooter';
import MainHeader from '@/components/common/layout/header/MainHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
      <MainFooter />
    </>
  );
}
