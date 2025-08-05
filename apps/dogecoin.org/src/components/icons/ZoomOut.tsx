import * as React from "react";
import type { SVGProps } from "react";
const SvgZoomOut = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.44 4.6a6.84 6.84 0 1 0 4.785 11.728l.005-.005A6.84 6.84 0 0 0 11.44 4.6m6.878 12.394a8.84 8.84 0 1 0-1.425 1.404l2.812 2.72a1 1 0 0 0 1.39-1.437zM7.4 11.4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgZoomOut;
