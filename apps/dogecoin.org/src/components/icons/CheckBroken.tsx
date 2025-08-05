import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckBroken = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 12C2 6.477 6.477 2 12 2c1.567 0 3.053.361 4.376 1.006a1 1 0 0 1-.877 1.798A8 8 0 1 0 20 12a1 1 0 1 1 2.001 0c0 5.523-4.477 10-10 10S2 17.523 2 12m18.02-6.332a1 1 0 0 1 0 1.414l-7.875 7.875a1 1 0 0 1-1.415 0l-2.25-2.25a1 1 0 1 1 1.415-1.414l1.543 1.543 7.167-7.168a1 1 0 0 1 1.415 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheckBroken;
