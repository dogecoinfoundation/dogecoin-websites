import * as React from "react";
import type { SVGProps } from "react";
const SvgDivider = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 2a1 1 0 0 1 1 1v2.919c0 .51.423.946.973.946h14.054A.96.96 0 0 0 20 5.919V3a1 1 0 1 1 2 0v2.919c0 1.64-1.344 2.946-2.973 2.946H4.973C3.343 8.865 2 7.559 2 5.919V3a1 1 0 0 1 1-1M2 12a1 1 0 0 1 1-1h.06a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m4.425 0a1 1 0 0 1 1-1h.06a1 1 0 1 1 0 2h-.06a1 1 0 0 1-1-1m4.545 0a1 1 0 0 1 1-1h.06a1 1 0 1 1 0 2h-.06a1 1 0 0 1-1-1m4.485 0a1 1 0 0 1 1-1h.06a1 1 0 1 1 0 2h-.06a1 1 0 0 1-1-1m4.485 0a1 1 0 0 1 1-1H21a1 1 0 1 1 0 2h-.06a1 1 0 0 1-1-1M4.973 17.135a.96.96 0 0 0-.973.946V21a1 1 0 1 1-2 0v-2.919c0-1.64 1.344-2.946 2.973-2.946h14.054c1.63 0 2.973 1.306 2.973 2.946V21a1 1 0 1 1-2 0v-2.919a.96.96 0 0 0-.973-.946z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDivider;
