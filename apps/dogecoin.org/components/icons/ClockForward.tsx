import * as React from "react";
import type { SVGProps } from "react";
const SvgClockForward = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.25 4a8 8 0 1 0 6.93 12 1 1 0 1 1 1.732 1 10 10 0 0 1-8.662 5c-5.523 0-10-4.477-10-10s4.477-10 10-10c5.086 0 9.286 3.797 9.918 8.711l.406-.406a1 1 0 0 1 1.414 1.415l-2.25 2.25a1 1 0 0 1-1.414 0l-2.25-2.25a1 1 0 0 1 1.414-1.415l.7.7A8 8 0 0 0 11.25 4m0 3.42a1 1 0 0 1 1 1v3.984l2.691.897a1 1 0 0 1-.632 1.898l-3.375-1.125a1 1 0 0 1-.684-.949V8.421a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClockForward;
