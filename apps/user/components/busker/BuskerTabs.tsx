'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@repo/ui/lib/utils';
import { motion } from 'framer-motion';

interface BuskerTabsProps {
  buskerUuid: string;
}

export function BuskerTabs({ buskerUuid }: BuskerTabsProps) {
  const pathname = usePathname();

  const tabs = [
    {
      name: '소개',
      href: `/busker/${buskerUuid}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
    },
    {
      name: '피드',
      href: `/busker/${buskerUuid}/notice`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      name: '릴스',
      href: `/busker/${buskerUuid}/media`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      ),
    },
    {
      name: '팬피드',
      href: `/busker/${buskerUuid}/fanFeed`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="border-b border-gray-700 bg-black/50 backdrop-blur-sm">
      <nav className="flex" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.name === '소개' && pathname === `/busker/${buskerUuid}`);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                'relative flex-1 flex flex-col items-center justify-center py-4 px-1 text-sm font-medium transition-colors duration-200',
                isActive ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center justify-center w-6 h-6">
                  {tab.icon}
                </div>
                <span>{tab.name}</span>
              </div>

              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  layoutId="activeTab"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
