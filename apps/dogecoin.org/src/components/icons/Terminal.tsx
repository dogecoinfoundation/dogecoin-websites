import * as React from "react";
import type { SVGProps } from "react";
const SvgTerminal = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.693 4.615a1 1 0 0 1 1.414 0l6.678 6.678a1 1 0 0 1 0 1.414l-6.678 6.678a1 1 0 0 1-1.414-1.414L7.664 12 1.693 6.029a1 1 0 0 1 0-1.414m8.055 14.063a1 1 0 0 1 1-1H21.6a1 1 0 1 1 0 2H10.748a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTerminal;
