import * as React from "react";
import type { SVGProps } from "react";
const SvgMessageSquare = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.4 3.4a1 1 0 0 0-1 1v10.191a1 1 0 0 0 1 1h2.278a1 1 0 0 1 1 1v2.595l3.302-3.302a1 1 0 0 1 .707-.293H19.6a1 1 0 0 0 1-1V4.4a1 1 0 0 0-1-1zm-3 1a3 3 0 0 1 3-3h15.2a3 3 0 0 1 3 3v10.191a3 3 0 0 1-3 3H12.1l-4.716 4.716a1 1 0 0 1-1.707-.707v-4.009H4.4a3 3 0 0 1-3-3z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgMessageSquare;
