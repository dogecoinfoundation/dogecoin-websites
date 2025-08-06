import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.356 4.276a1 1 0 0 1 .035 1.414L6.333 11H20a1 1 0 0 1 0 2H6.333l5.058 5.31a1 1 0 0 1-1.449 1.38l-6.666-7a1 1 0 0 1 0-1.38l6.666-7a1 1 0 0 1 1.414-.034"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowLeft;
