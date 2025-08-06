import * as React from "react";
import type { SVGProps } from "react";
const SvgClockBackward = (props: SVGProps<SVGSVGElement>) => (
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
      d="M.5 12C.5 6.477 4.978 2 10.502 2a10 10 0 0 1 8.664 5 1 1 0 1 1-1.731 1 8 8 0 0 0-6.933-4 8.001 8.001 0 1 0 0 16 8.003 8.003 0 0 0 7.942-7.006l-.702.7a1 1 0 0 1-1.414-1.413l2.25-2.25a1 1 0 0 1 1.415 0l2.25 2.25a1 1 0 0 1-1.414 1.414l-.407-.407C19.79 18.203 15.59 22 10.503 22 4.978 22 .5 17.523.5 12m10-4.375a1 1 0 0 1 1 1v3.983l2.691.897a1 1 0 0 1-.632 1.898l-3.375-1.125a1 1 0 0 1-.684-.949V8.625a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClockBackward;
