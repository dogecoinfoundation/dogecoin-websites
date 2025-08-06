import * as React from "react";
import type { SVGProps } from "react";
const SvgCoins = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.253 7C5.313 7 3 9.277 3 12s2.313 5 5.253 5q.542 0 1.05-.1a1 1 0 0 1 .38 1.964Q8.988 19 8.253 19C4.287 19 1 15.905 1 12s3.287-7 7.253-7q.735.001 1.43.136a1 1 0 1 1-.38 1.964Q8.796 7 8.254 7m7.494 0c-2.941 0-5.254 2.277-5.254 5s2.313 5 5.254 5S21 14.723 21 12s-2.313-5-5.253-5m-7.254 5c0-3.905 3.287-7 7.254-7S23 8.095 23 12s-3.287 7-7.253 7-7.254-3.095-7.254-7"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCoins;
