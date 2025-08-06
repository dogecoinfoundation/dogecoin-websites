import * as React from "react";
import type { SVGProps } from "react";
const SvgPentagon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.418 2.187a1 1 0 0 1 1.164 0l9.6 6.875a1 1 0 0 1 .368 1.126l-3.667 11.125a1 1 0 0 1-.95.687H6.067a1 1 0 0 1-.95-.687L1.45 10.188a1 1 0 0 1 .368-1.126zM3.58 10.26 6.79 20h10.42l3.21-9.74L12 4.23z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPentagon;
