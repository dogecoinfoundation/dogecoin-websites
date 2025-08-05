import * as React from "react";
import type { SVGProps } from "react";
const SvgClockPlus = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.25 4a8 8 0 1 0 1.501 15.86 1 1 0 1 1 .373 1.965q-.913.174-1.874.175c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8m0 3.42a1 1 0 0 1 1 1v3.984l2.691.897a1 1 0 0 1-.632 1.898l-3.375-1.125a1 1 0 0 1-.684-.949V8.421a1 1 0 0 1 1-1m7.313 6.955a1 1 0 0 1 1 1v1.813h1.812a1 1 0 1 1 0 2h-1.812V21a1 1 0 1 1-2 0v-1.812H15.75a1 1 0 1 1 0-2h1.813v-1.813a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClockPlus;
