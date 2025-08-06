import * as React from "react";
import type { SVGProps } from "react";
const SvgLinkExternal = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.586 4h-3.211a1 1 0 0 1 0-2H21a1 1 0 0 1 1 1v5.063a1 1 0 1 1-2 0V5.414l-7.856 7.855a1 1 0 1 1-1.414-1.414zM6.374 4A2.375 2.375 0 0 0 4 6.375v11.25A2.375 2.375 0 0 0 6.375 20h11.25A2.375 2.375 0 0 0 20 17.625v-4.5a1 1 0 0 1 2 0v4.5A4.375 4.375 0 0 1 17.625 22H6.375A4.375 4.375 0 0 1 2 17.625V6.375A4.375 4.375 0 0 1 6.375 2h4.5a1 1 0 1 1 0 2z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLinkExternal;
