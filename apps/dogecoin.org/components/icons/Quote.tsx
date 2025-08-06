import * as React from "react";
import type { SVGProps } from "react";
const SvgQuote = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.128 7a5.13 5.13 0 0 0-5.123 5.313 4.064 4.064 0 1 1 1.063 5.948 1 1 0 0 1-.246-.094c-1.051-.568-1.736-1.772-2.148-2.827C2.244 14.243 2 13.025 2 12.128A7.13 7.13 0 0 1 9.128 5a1 1 0 0 1 0 2M19.85 7a5.13 5.13 0 0 0-5.122 5.313 4.064 4.064 0 1 1 1.063 5.948 1 1 0 0 1-.246-.094c-1.052-.568-1.736-1.772-2.15-2.827-.428-1.097-.673-2.315-.673-3.212A7.13 7.13 0 0 1 19.851 5a1 1 0 0 1 0 2M7.213 12.745a2.064 2.064 0 1 0 0 4.127 2.064 2.064 0 0 0 0-4.127m10.723 0a2.064 2.064 0 1 0 0 4.127 2.064 2.064 0 0 0 0-4.127"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgQuote;
