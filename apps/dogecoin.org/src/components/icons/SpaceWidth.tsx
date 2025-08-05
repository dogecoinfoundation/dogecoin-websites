import * as React from "react";
import type { SVGProps } from "react";
const SvgSpaceWidth = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.4 1.4a1 1 0 0 1 1 1v19.2a1 1 0 1 1-2 0V2.4a1 1 0 0 1 1-1m19.2 0a1 1 0 0 1 1 1v19.2a1 1 0 1 1-2 0V2.4a1 1 0 0 1 1-1M9.142 8.897a1 1 0 0 1-.009 1.415L8.436 11h7.128l-.697-.688a1 1 0 1 1 1.405-1.424l2.43 2.4a1 1 0 0 1 0 1.424l-2.43 2.4a1 1 0 0 1-1.405-1.423l.697-.689H8.436l.697.689a1 1 0 1 1-1.405 1.423l-2.43-2.4a1 1 0 0 1 0-1.424l2.43-2.4a1 1 0 0 1 1.414.01"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSpaceWidth;
