import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.662 20.737a1 1 0 0 1-.062-1.412l6.961-7.326L8.6 4.676a1 1 0 1 1 1.475-1.352l7.58 8a1 1 0 0 1 0 1.35l-7.58 8.001a1 1 0 0 1-1.413.062"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgChevronRight;
