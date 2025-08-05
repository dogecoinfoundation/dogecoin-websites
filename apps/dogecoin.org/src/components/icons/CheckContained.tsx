import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckContained = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16m3.85 5.276a1 1 0 0 1 0 1.414l-4.268 4.267a1 1 0 0 1-1.414 0l-1.455-1.454a1 1 0 1 1 1.415-1.415l.747.748 3.56-3.56a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheckContained;
