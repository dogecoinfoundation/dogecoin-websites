import * as React from "react";
import type { SVGProps } from "react";
const SvgExpand = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 5a3 3 0 0 1 3-3h4a1 1 0 0 1 0 2H5a1 1 0 0 0-1 1v4a1 1 0 0 1-2 0zm12-2a1 1 0 0 1 1-1h4a3 3 0 0 1 3 3v4a1 1 0 1 1-2 0V5a1 1 0 0 0-1-1h-4a1 1 0 0 1-1-1M3 14a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3v-4a1 1 0 0 1 1-1m18 0a1 1 0 0 1 1 1v4a3 3 0 0 1-3 3h-4a1 1 0 1 1 0-2h4a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgExpand;
