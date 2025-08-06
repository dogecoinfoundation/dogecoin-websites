import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowUpLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.05 9.465v6.107a1 1 0 0 1-2 0V7.05a1 1 0 0 1 1-1h8.401a1 1 0 1 1 0 2H9.465l8.192 8.193a1 1 0 0 1-1.414 1.414z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowUpLeft;
