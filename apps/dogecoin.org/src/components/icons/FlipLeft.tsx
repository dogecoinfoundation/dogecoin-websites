import * as React from "react";
import type { SVGProps } from "react";
const SvgFlipLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11 19.2a1 1 0 0 0 1 1h5.6a5 5 0 0 0 5-5v-1.784a5 5 0 0 0-5-5H4.79l2.875-2.914a1 1 0 1 0-1.424-1.404L1.688 8.713a1 1 0 0 0 0 1.405l4.554 4.615a1 1 0 1 0 1.424-1.404L4.79 10.415H17.6a3 3 0 0 1 3 3V15.2a3 3 0 0 1-3 3H12a1 1 0 0 0-1 1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgFlipLeft;
