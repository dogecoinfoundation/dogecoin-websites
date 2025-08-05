import * as React from "react";
import type { SVGProps } from "react";
const SvgCursorArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g fill="currentColor">
      <path d="M13.923 16.03c.175.42.007 2.015-.923 2.384s-2.118 0-2.118 0l-2.156-4.312L5 17.828V1l11.414 11.414h-4.252c.208.4 1.538 3.08 1.761 3.616" />
      <path
        fillRule="evenodd"
        d="M6 3.414v12l3-3 2.5 5s.676.216 1 0 .646-.65.5-1c-.688-1.65-2.5-5-2.5-5H14z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
export default SvgCursorArrow;
