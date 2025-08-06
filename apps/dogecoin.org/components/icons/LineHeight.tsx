import * as React from "react";
import type { SVGProps } from "react";
const SvgLineHeight = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.388 4a1 1 0 0 1 .707.293l3.389 3.388a1 1 0 0 1-1.415 1.414l-1.68-1.68v10.983l1.68-1.682a1 1 0 0 1 1.415 1.415l-3.389 3.388a1 1 0 0 1-1.414 0L2.293 18.13a1 1 0 1 1 1.414-1.415l1.681 1.682V7.414l-1.68 1.681a1 1 0 1 1-1.415-1.414L5.68 4.293A1 1 0 0 1 6.388 4m6.906 2.13a1 1 0 0 1 1-1H22.2a1 1 0 1 1 0 2h-7.906a1 1 0 0 1-1-1m0 4.517a1 1 0 0 1 1-1H22.2a1 1 0 0 1 0 2h-7.906a1 1 0 0 1-1-1m0 4.518a1 1 0 0 1 1-1H22.2a1 1 0 1 1 0 2h-7.906a1 1 0 0 1-1-1m0 4.517a1 1 0 0 1 1-1H22.2a1 1 0 1 1 0 2h-7.906a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLineHeight;
