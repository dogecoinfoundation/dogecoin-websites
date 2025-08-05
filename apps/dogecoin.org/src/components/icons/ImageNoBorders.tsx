import * as React from "react";
import type { SVGProps } from "react";
const SvgImageNoBorders = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.6 4.6a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6m-2.8.8a2.8 2.8 0 1 1 5.6 0 2.8 2.8 0 0 1-5.6 0m10.12 4.4a1 1 0 0 1 .78.375l7.68 9.6a1 1 0 0 1-.78 1.625H2.4a1 1 0 0 1-.781-1.625l5.28-6.6a1 1 0 0 1 1.562 0L9.6 14.6l3.539-4.424a1 1 0 0 1 .78-.375m0 2.6-3.54 4.425a1 1 0 0 1-1.561 0L7.679 15.4 4.482 19.4h15.038z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgImageNoBorders;
