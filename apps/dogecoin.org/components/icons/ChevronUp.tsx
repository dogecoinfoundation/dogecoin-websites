import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronUp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M21.075 15.675a1 1 0 0 1-1.413.062l-7.326-6.96-7.323 6.96a1 1 0 0 1-1.351-1.474l7.999-7.58a1 1 0 0 1 1.35 0l8.001 7.58a1 1 0 0 1 .063 1.412"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgChevronUp;
