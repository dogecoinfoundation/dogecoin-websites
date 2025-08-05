import * as React from "react";
import type { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.2 3.4a1.4 1.4 0 0 0-1.4 1.4v14.4a1.4 1.4 0 0 0 1.4 1.4h9.6a1.4 1.4 0 0 0 1.4-1.4V4.8a1.4 1.4 0 0 0-1.4-1.4zM3.8 4.8a3.4 3.4 0 0 1 3.4-3.4h9.6a3.4 3.4 0 0 1 3.4 3.4v14.4a3.4 3.4 0 0 1-3.4 3.4H7.2a3.4 3.4 0 0 1-3.4-3.4zM8 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1m3 10.8a1 1 0 0 1 1-1h.085a1 1 0 0 1 1 1v.077a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
