import * as React from "react";
import type { SVGProps } from "react";
const SvgTable = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.4 6A4.6 4.6 0 0 1 6 1.4h12A4.6 4.6 0 0 1 22.6 6v12a4.6 4.6 0 0 1-4.6 4.6H6A4.6 4.6 0 0 1 1.4 18zM10 20.6h8a2.6 2.6 0 0 0 2.6-2.6v-8H10zM8 10v10.6H6A2.6 2.6 0 0 1 3.4 18v-8zm2-2h10.6V6A2.6 2.6 0 0 0 18 3.4h-8zM8 3.4V8H3.4V6A2.6 2.6 0 0 1 6 3.4z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTable;
