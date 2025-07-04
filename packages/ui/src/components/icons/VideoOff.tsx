import * as React from 'react';

export const VideoOff = ({
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
    <path
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8m-6 0a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2zM2 2l20 20"
    />
  </svg>
);
