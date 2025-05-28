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
    <path d="M4 11.5V20h16v-8.5" />
    <path d="m4 4 16 4.5" />
    <path d="m12 13-1-2.5" />
    <path d="m8 12-1-2.5" />
    <path d="m16 13-1-2.5" />
    <path d="m20 12-1-2.5" />
  </svg>
);
