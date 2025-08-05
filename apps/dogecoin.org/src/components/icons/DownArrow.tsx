import * as React from "react";
import type { SVGProps } from "react";
const SvgDownArrow = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 3a1 1 0 0 1 1 1v13.667l5.31-5.058a1 1 0 1 1 1.38 1.448l-7 6.667a1 1 0 0 1-1.38 0l-7-6.667a1 1 0 0 1 1.38-1.448L11 17.667V4a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDownArrow;
