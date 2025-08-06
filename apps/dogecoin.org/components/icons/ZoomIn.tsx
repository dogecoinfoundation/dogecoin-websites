import * as React from "react";
import type { SVGProps } from "react";
const SvgZoomIn = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.44 4.6a6.84 6.84 0 1 0 4.785 11.728l.005-.005A6.84 6.84 0 0 0 11.44 4.6m6.878 12.394a8.84 8.84 0 1 0-1.425 1.404l2.812 2.72a1 1 0 0 0 1.39-1.437zM11.4 7.4a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2h-2a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgZoomIn;
