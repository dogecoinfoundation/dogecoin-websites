import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.6 8.325a1 1 0 0 1 1.413-.062l7.325 6.96 7.324-6.96a1 1 0 0 1 1.35 1.474l-7.999 7.58a1 1 0 0 1-1.35 0l-8.001-7.58A1 1 0 0 1 3.6 8.325"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgChevronDown;
