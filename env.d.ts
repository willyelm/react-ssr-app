// CSS Modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
// Markdown
declare module '*.mdx' {
  const markdown: string;
  export default markdown;
}
// Images
declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react';
  const svg: FunctionComponent<SVGProps<SVGElement> & { title?: string }>;
  export default svg;
}
declare module '*.jpeg' {
  const jpeg: string;
  export default jpeg;
}
declare module '*.png' {
  const png: string;
  export default png;
}
