import * as React from "react";
import type { SVGProps } from "react";
const SvgIntersect = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.2 3.4a1.4 1.4 0 0 0-1.4 1.4v3h3a3.4 3.4 0 0 1 3.4 3.4v3h3a1.4 1.4 0 0 0 1.4-1.4v-8a1.4 1.4 0 0 0-1.4-1.4zm5 12.8h3a3.4 3.4 0 0 0 3.4-3.4v-8a3.4 3.4 0 0 0-3.4-3.4h-8a3.4 3.4 0 0 0-3.4 3.4v3h-3a3.4 3.4 0 0 0-3.4 3.4v8a3.4 3.4 0 0 0 3.4 3.4h8a3.4 3.4 0 0 0 3.4-3.4zm-2-2v-3a1.4 1.4 0 0 0-1.4-1.4h-3v3a1.4 1.4 0 0 0 1.4 1.4v2a3.4 3.4 0 0 1-3.4-3.4v-3h-3a1.4 1.4 0 0 0-1.4 1.4v8a1.4 1.4 0 0 0 1.4 1.4h8a1.4 1.4 0 0 0 1.4-1.4v-3h-3v-2z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgIntersect;
