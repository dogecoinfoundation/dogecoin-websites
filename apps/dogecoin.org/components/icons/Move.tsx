import * as React from "react";
import type { SVGProps } from "react";
const SvgMove = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.293 1.693a1 1 0 0 1 1.414 0l3.363 3.363a1 1 0 0 1-1.414 1.414L13 4.814V11h6.186L17.53 9.344a1 1 0 0 1 1.414-1.414l3.363 3.363a1 1 0 0 1 0 1.414l-3.363 3.363a1 1 0 0 1-1.414-1.414L19.186 13H13v6.186l1.656-1.656a1 1 0 1 1 1.414 1.414l-3.363 3.363a1 1 0 0 1-1.414 0L7.93 18.944a1 1 0 1 1 1.414-1.414L11 19.186V13H4.814l1.656 1.656a1 1 0 1 1-1.414 1.414l-3.363-3.363a1 1 0 0 1 0-1.414L5.056 7.93A1 1 0 0 1 6.47 9.344L4.814 11H11V4.814L9.344 6.47A1 1 0 1 1 7.93 5.056z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgMove;
