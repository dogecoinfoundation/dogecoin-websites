import * as React from "react";
import type { SVGProps } from "react";
const SvgCardNumber = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.4 6.9a3.4 3.4 0 0 1 3.4-3.4h14.4a3.4 3.4 0 0 1 3.4 3.4v4.2a1 1 0 1 1-2 0V9.7H3.4v6.2a1.4 1.4 0 0 0 1.4 1.4h9.6a1 1 0 1 1 0 2H4.8a3.4 3.4 0 0 1-3.4-3.4zm2 .8h17.2v-.8a1.4 1.4 0 0 0-1.4-1.4H4.8a1.4 1.4 0 0 0-1.4 1.4zm17.19 5.351a1 1 0 0 1 .535.885V18.5h.418a1 1 0 1 1 0 2H18.6a1 1 0 0 1 0-2h.524v-2.663l-.18.123a1 1 0 0 1-1.132-1.648l1.745-1.2a1 1 0 0 1 1.032-.06"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCardNumber;
