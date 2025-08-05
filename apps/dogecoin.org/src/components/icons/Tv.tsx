import * as React from "react";
import type { SVGProps } from "react";
const SvgTv = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 6.286C2 4.486 3.44 3 5.25 3h13.5C20.56 3 22 4.486 22 6.286v8c0 1.8-1.44 3.285-3.25 3.285h-4.362l1.7 1.727a1 1 0 0 1-1.426 1.404L12 17.997l-2.662 2.705a1 1 0 1 1-1.426-1.404l1.7-1.727H5.25c-1.81 0-3.25-1.486-3.25-3.285zm16.75 9.285c.676 0 1.25-.56 1.25-1.285v-8C20 5.56 19.426 5 18.75 5H5.25C4.574 5 4 5.56 4 6.286v8c0 .725.574 1.285 1.25 1.285z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTv;
