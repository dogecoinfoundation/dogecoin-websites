import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronDoubleUp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.707 19.707a1 1 0 0 1-1.414 0L11.4 14.814l-4.893 4.893a1 1 0 0 1-1.414-1.414l5.6-5.6a1 1 0 0 1 1.414 0l5.6 5.6a1 1 0 0 1 0 1.414m0-8.4a1 1 0 0 1-1.414 0L11.4 6.414l-4.893 4.893a1 1 0 0 1-1.414-1.414l5.6-5.6a1 1 0 0 1 1.414 0l5.6 5.6a1 1 0 0 1 0 1.414"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgChevronDoubleUp;
