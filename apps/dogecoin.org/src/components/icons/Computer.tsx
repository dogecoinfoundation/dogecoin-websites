import * as React from "react";
import type { SVGProps } from "react";
const SvgComputer = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.4 6a3.4 3.4 0 0 1 3.4-3.4h14.4A3.4 3.4 0 0 1 22.6 6v8.4a3.4 3.4 0 0 1-3.4 3.4H13v1.4q0 .102-.02.2h2.62a1 1 0 1 1 0 2H8.4a1 1 0 1 1 0-2h2.62a1 1 0 0 1-.02-.2v-1.4H4.8a3.4 3.4 0 0 1-3.4-3.4zm17.8 9.8a1.4 1.4 0 0 0 1.4-1.4V6a1.4 1.4 0 0 0-1.4-1.4H4.8A1.4 1.4 0 0 0 3.4 6v8.4a1.4 1.4 0 0 0 1.4 1.4z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComputer;
