import * as React from "react";
import type { SVGProps } from "react";
const SvgDiamond = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.7 2.83H6.502a1 1 0 0 0-.797.396l-4.1 5.406a1 1 0 0 0 .044 1.264l9.6 10.934a1 1 0 0 0 1.503 0l9.6-10.934a1 1 0 0 0 .052-1.256l-4.008-5.405a1 1 0 0 0-.803-.405zm-4.65 2H6.998L4.414 8.236h3.322zM7.76 10.236h-3.15l4.967 5.658zm6.706 5.61 4.926-5.61H16.3zm-.27-5.61H9.86l2.148 6.69zm.067-2H9.88l1.315-3.406h1.79zm2.136 0L15.12 4.83h1.968l2.525 3.406z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDiamond;
