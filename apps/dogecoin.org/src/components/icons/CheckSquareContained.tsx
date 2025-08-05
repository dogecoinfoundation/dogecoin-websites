import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckSquareContained = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zm12.746 2.334a1 1 0 0 1-.08 1.412l-4.474 4a1 1 0 0 1-1.333 0l-1.525-1.364a1 1 0 1 1 1.332-1.491l.86.768 3.807-3.405a1 1 0 0 1 1.412.08"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheckSquareContained;
