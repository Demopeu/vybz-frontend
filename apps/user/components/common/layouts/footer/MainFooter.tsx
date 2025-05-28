'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { FooterData } from '@/data/FooterData';

export default function MainFooter() {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // 현재 활성화된 탭 인덱스 찾기
  useEffect(() => {
    const index = FooterData.findIndex(
      ({ path }) => pathname === path || pathname.startsWith(`${path}/`)
    );
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [pathname, activeIndex]);

  // 탭 전환 핸들러
  const handleTabChange = (path: string, index: number) => {
    if (index === activeIndex) return;

    setIsTransitioning(true);
    setActiveIndex(index);

    // 애니메이션 완료 후 페이지 이동
    setTimeout(() => {
      router.push(path);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-transparent backdrop-blur-sm text-white z-50 h-16">
      <div className="relative w-full h-full flex justify-around items-center">
        {/* 움직이는 배경 원 */}
        {activeIndex !== -1 && (
          <div
            className={`absolute rounded-full bg-cyan-400 transition-all duration-300 ease-in-out
              ${isTransitioning ? 'scale-90 opacity-80' : 'scale-100 opacity-100'}`}
            style={{
              width: '3rem',
              height: '3rem',
              left: `calc((100% / ${FooterData.length}) * ${activeIndex} + ((100% / ${FooterData.length}) - 3rem) / 2)`,
              transform: `translateX(0) scale(${isTransitioning ? '0.8' : '1'})`,
            }}
          />
        )}

        {/* 버튼들 */}
        <div className="flex justify-around items-center w-full">
          {FooterData.map(({ id, icon: Icon, path }, index) => {
            const isActive = index === activeIndex;
            return (
              <Button
                key={id}
                onClick={() => handleTabChange(path, index)}
                className={`w-12 h-12 rounded-full border-none flex items-center justify-center transition-all duration-300 z-10 relative bg-transparent
                  ${isActive ? 'scale-110' : 'scale-100'}`}
              >
                <Icon
                  width={24}
                  height={24}
                  className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}
                />
              </Button>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
