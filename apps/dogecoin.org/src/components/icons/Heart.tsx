import * as React from "react";
import type { SVGProps } from "react";
const SvgHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.78 2.778a5.8 5.8 0 0 1 4.086 9.964l-8.188 8.19a1 1 0 0 1-1.414 0L3.07 12.737a5.8 5.8 0 0 1 0-8.201 5.8 5.8 0 0 1 8.201 0l.7.698.694-.693a5.8 5.8 0 0 1 4.115-1.763m1.489 2.282a3.8 3.8 0 0 0-4.164.869l-.008.008-.013.013-1.406 1.405a1 1 0 0 1-1.414 0L9.858 5.95a3.8 3.8 0 0 0-5.373 5.373l7.486 7.487 7.486-7.487.004-.003.009-.01a3.8 3.8 0 0 0 .047-5.42 3.8 3.8 0 0 0-1.248-.83"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHeart;
