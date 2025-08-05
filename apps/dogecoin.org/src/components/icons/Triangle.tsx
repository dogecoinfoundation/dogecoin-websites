import * as React from "react";
import type { SVGProps } from "react";
const SvgTriangle = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 2.6a1 1 0 0 1 .868.504l9.6 16.8A1 1 0 0 1 21.6 21.4H2.4a1 1 0 0 1-.868-1.496l9.6-16.8A1 1 0 0 1 12 2.6M4.123 19.4h15.754L12 5.616z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTriangle;
