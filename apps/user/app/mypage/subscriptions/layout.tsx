import CommonHeader from '@/components/common/layouts/header/CommonHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CommonHeader title="내 정기구독" href="/mypage" />
      {children}
    </>
  );
}
