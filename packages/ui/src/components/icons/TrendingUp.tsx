import * as React from 'react';

export const TrendingUp = ({
  height = '1em',
  strokeWidth = '2',
  fill = 'none',
  focusable = 'false',
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'>) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <g
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <path d="m3 17l6-6l4 4l8-8" />
      <path d="M14 7h7v7" />
    </g>
  </svg>
);
