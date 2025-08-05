import * as React from "react";
import type { SVGProps } from "react";
const SvgCardLock = (props: SVGProps<SVGSVGElement>) => (
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
      d="M.8 6.9a3.4 3.4 0 0 1 3.4-3.4h14.4A3.4 3.4 0 0 1 22 6.9v1.8a1 1 0 0 1-1.3.954 1 1 0 0 1-.3.046H2.8v6.2a1.4 1.4 0 0 0 1.4 1.4H12a1 1 0 1 1 0 2H4.2a3.4 3.4 0 0 1-3.4-3.4zm2 .8H20v-.8a1.4 1.4 0 0 0-1.4-1.4H4.2a1.4 1.4 0 0 0-1.4 1.4zm16.4 5.8a.5.5 0 0 0-.5.5v.5h1V14a.5.5 0 0 0-.5-.5m2.5 1.063V14a2.5 2.5 0 0 0-5 0v.563a2 2 0 0 0-1.5 1.937v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-1.5-1.937M17.2 16.5v2h4v-2z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCardLock;
