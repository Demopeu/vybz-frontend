import type { JSX, SVGProps } from 'react';

export type FooterItemType = {
  id: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  path: string;
};