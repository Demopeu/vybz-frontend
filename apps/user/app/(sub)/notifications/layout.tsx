import CommonHeader from '@/components/common/layouts/header/CommonHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CommonHeader title="알림" href="/main" className="!bg-background" />
      {children}
    </>
  );
}
