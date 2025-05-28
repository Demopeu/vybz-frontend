import MainFooter from '@/components/common/layouts/footer/MainFooter';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {children}
      </div>
      <MainFooter />
    </div>
  );
}
