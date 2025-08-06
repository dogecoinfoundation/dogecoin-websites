import * as React from "react";
import type { SVGProps } from "react";
const SvgXCircleContained = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m6.11-3.89a1 1 0 0 1 1.415 0L12 10.587l2.475-2.475a1 1 0 1 1 1.414 1.414L13.414 12l2.475 2.475a1 1 0 0 1-1.414 1.414L12 13.414 9.525 15.89a1 1 0 0 1-1.414-1.414L10.586 12 8.11 9.525a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgXCircleContained;
