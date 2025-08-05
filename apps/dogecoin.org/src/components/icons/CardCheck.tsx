import * as React from "react";
import type { SVGProps } from "react";
const SvgCardCheck = (props: SVGProps<SVGSVGElement>) => (
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
      d="M.8 7.5a3.4 3.4 0 0 1 3.4-3.4h14.4A3.4 3.4 0 0 1 22 7.5v4.2a1 1 0 1 1-2 0v-1.4H2.8v6.2a1.4 1.4 0 0 0 1.4 1.4h9.6a1 1 0 1 1 0 2H4.2a3.4 3.4 0 0 1-3.4-3.4zm2 .8H20v-.8a1.4 1.4 0 0 0-1.4-1.4H4.2a1.4 1.4 0 0 0-1.4 1.4zm20.107 5.693a1 1 0 0 1 0 1.414l-3.291 3.292a1 1 0 0 1-1.415 0l-1.508-1.509a1 1 0 0 1 1.414-1.414l.801.801 2.585-2.584a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCardCheck;
