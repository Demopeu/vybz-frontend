import * as React from 'react';

export const Reels = ({
  width = 24,
  height = 24,
  ...props
}: {
  width?: number | string;
  height?: number | string;
} & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <path d="M7 3v18" />
    <path d="M3 7.5h4" />
    <path d="M3 16.5h4" />
    <path d="M17 3v18" />
    <path d="M17 7.5h4" />
    <path d="M17 16.5h4" />
    <path d="M7 12h10" />
  </svg>
);
