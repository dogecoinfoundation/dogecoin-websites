import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.644 4.276a1 1 0 0 1 1.414.034l6.666 7a1 1 0 0 1 0 1.38l-6.666 7a1 1 0 0 1-1.449-1.38L17.667 13H4a1 1 0 1 1 0-2h13.667l-5.058-5.31a1 1 0 0 1 .035-1.414"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowRight;
