import * as React from "react";
import type { SVGProps } from "react";
const SvgDash = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.8 12a1 1 0 0 1 1-1h14.4a1 1 0 1 1 0 2H4.8a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDash;
