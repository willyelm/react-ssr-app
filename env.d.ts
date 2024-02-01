// Markdown
declare module '*.mdx' {
  const markdown: any;
  export default markdown;
}
// Vector React Elements
declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react';
  const svg: FunctionComponent<SVGProps<SVGElement> & { title?: string }>;
  export default svg;
}
// Images
declare module '*.{jpeg,jpg,png}' {
  const jpeg: string;
  export default jpeg;
}
