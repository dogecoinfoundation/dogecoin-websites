import * as React from "react";
import type { SVGProps } from "react";
const SvgOctagon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15.94 1.4a1 1 0 0 1 .709.29l5.633 5.601a1 1 0 0 1 .295.707l.023 7.943a1 1 0 0 1-.29.708l-5.602 5.633a1 1 0 0 1-.706.295L8.06 22.6a1 1 0 0 1-.708-.29l-5.633-5.601a1 1 0 0 1-.295-.707L1.4 8.06a1 1 0 0 1 .29-.708l5.601-5.633a1 1 0 0 1 .707-.295zM8.419 3.422 3.4 8.467l.02 7.115L8.468 20.6l7.115-.02 5.017-5.046-.02-7.115L15.531 3.4z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgOctagon;
