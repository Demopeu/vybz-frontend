import * as React from 'react';

export const CrossedTools = ({
  width = 24,
  height = 24,
  fill = 'currentColor',
  ...props
}: {
  width?: number | string;
  height?: number | string;
  fill?: string;
} & React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={width}
    height={height}
    focusable="false"
    {...props}
  >
    <g fill={fill}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 10a4.5 4.5 0 0 0 4.284-5.882c-.105-.324-.51-.391-.751-.15L15.34 6.66a.454.454 0 0 1-.493.11a3.01 3.01 0 0 1-1.618-1.616a.455.455 0 0 1 .11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 0 0-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 1 0 3.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8c.096.007.193.01.291.01M5 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
      />
      <path d="M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 0 1-3.536 3.536l-4.41-4.41l2.172-2.607c.052-.062.147-.138.342-.196a2.28 2.28 0 0 1 .777-.067c.128.008.257.012.387.012M6 4.586l2.33 2.33a.452.452 0 0 1-.08.09L6.8 8.214L4.586 6H3.309a.5.5 0 0 1-.447-.276l-1.7-3.402a.5.5 0 0 1 .093-.577l.49-.49a.5.5 0 0 1 .577-.094l3.402 1.7A.5.5 0 0 1 6 3.31z" />
    </g>
  </svg>
);
