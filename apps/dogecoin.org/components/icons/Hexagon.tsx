import * as React from "react";
import type { SVGProps } from "react";
const SvgHexagon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.504 1.532a1 1 0 0 1 .992 0l8.4 4.8a1 1 0 0 1 .504.868v9.6a1 1 0 0 1-.504.868l-8.4 4.8a1 1 0 0 1-.992 0l-8.4-4.8A1 1 0 0 1 2.6 16.8V7.2a1 1 0 0 1 .504-.868zM4.6 7.78v8.44l7.4 4.228 7.4-4.228V7.78L12 3.552z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHexagon;
