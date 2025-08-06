import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.31 3.276a1 1 0 0 1 1.38 0l7 6.667a1 1 0 0 1-1.38 1.448L13 6.333V20a1 1 0 1 1-2 0V6.333l-5.31 5.058a1 1 0 1 1-1.38-1.448z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowUp;
