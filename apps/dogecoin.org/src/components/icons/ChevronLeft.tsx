import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16.013 3.263a1 1 0 0 1 .062 1.412l-6.962 7.326 6.962 7.324a1 1 0 1 1-1.475 1.35l-7.58-7.999a1 1 0 0 1 0-1.35l7.58-8.001a1 1 0 0 1 1.412-.062"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgChevronLeft;
