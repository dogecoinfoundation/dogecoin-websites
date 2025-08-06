import * as React from "react";
import type { SVGProps } from "react";
const SvgOverlap = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.2 3.4a1.4 1.4 0 0 0-1.4 1.4v8a1.4 1.4 0 0 0 1.4 1.4h8a1.4 1.4 0 0 0 1.4-1.4v-8a1.4 1.4 0 0 0-1.4-1.4zM7.8 4.8a3.4 3.4 0 0 1 3.4-3.4h8a3.4 3.4 0 0 1 3.4 3.4v8a3.4 3.4 0 0 1-3.4 3.4h-3v3a3.4 3.4 0 0 1-3.4 3.4h-8a3.4 3.4 0 0 1-3.4-3.4v-8a3.4 3.4 0 0 1 3.4-3.4h2.4c.225 0 .433.074.6.2zm0 4.8a1 1 0 0 1-.6.2H4.8a1.4 1.4 0 0 0-1.4 1.4v8a1.4 1.4 0 0 0 1.4 1.4h8a1.4 1.4 0 0 0 1.4-1.4v-3h-3a3.4 3.4 0 0 1-3.4-3.4z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgOverlap;
