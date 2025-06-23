import MainHeader from '@/components/common/layout/header/MainHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
