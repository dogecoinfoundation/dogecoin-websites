import * as React from "react";
import type { SVGProps } from "react";
const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 7a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m2.462 5a1 1 0 0 1 1-1h11.077a1 1 0 0 1 0 2H6.461a1 1 0 0 1-1-1m3.692 5a1 1 0 0 1 1-1h3.692a1 1 0 0 1 0 2h-3.692a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgFilter;
