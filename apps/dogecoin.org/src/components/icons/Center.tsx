import * as React from "react";
import type { SVGProps } from "react";
const SvgCenter = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.813 2a1 1 0 0 1 1 1v1.813h10.375V3a1 1 0 1 1 2 0v1.813H21a1 1 0 1 1 0 2h-1.812v10.375H21a1 1 0 1 1 0 2h-1.812V21a1 1 0 1 1-2 0v-1.812H6.813V21a1 1 0 1 1-2 0v-1.812H3a1 1 0 1 1 0-2h1.813V6.813H3a1 1 0 0 1 0-2h1.813V3a1 1 0 0 1 1-1m1 4.813v10.375h10.375V6.813z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCenter;
