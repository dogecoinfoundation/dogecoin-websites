import * as React from "react";
import type { SVGProps } from "react";
const SvgClock01 = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.5 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16m-10 8c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10m10-4.58a1 1 0 0 1 1 1v3.984l2.691.897a1 1 0 0 1-.632 1.898l-3.375-1.125a1 1 0 0 1-.684-.949V8.421a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClock01;
