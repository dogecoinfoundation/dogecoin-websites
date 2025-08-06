import * as React from "react";
import type { SVGProps } from "react";
const SvgLightningCircleContained = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m11.062-6.575a1 1 0 0 1 .688.95v3.875h2.75a1 1 0 0 1 .772 1.636l-5.25 6.375a1 1 0 0 1-1.772-.636V14.5H7.5a1 1 0 0 1-.805-1.593l5.25-7.125a1 1 0 0 1 1.117-.357M9.48 12.5h1.771a1 1 0 0 1 1 1v1.338l2.131-2.588H12.75a1 1 0 0 1-1-1V9.418z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLightningCircleContained;
