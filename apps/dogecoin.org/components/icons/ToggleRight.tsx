import * as React from "react";
import type { SVGProps } from "react";
const SvgToggleRight = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.5 12c0-2.9 2.35-5.25 5.25-5.25h8.5a5.25 5.25 0 1 1 0 10.5h-8.5A5.25 5.25 0 0 1 2.5 12m13.75 3.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5m-4.123-6.5C11.42 9.644 11 10.773 11 12s.421 2.356 1.127 3.25H7.75a3.25 3.25 0 0 1 0-6.5z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgToggleRight;
