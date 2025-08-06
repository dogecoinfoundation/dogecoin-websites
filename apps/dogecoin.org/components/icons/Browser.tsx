import * as React from "react";
import type { SVGProps } from "react";
const SvgBrowser = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.8 3.4a1.4 1.4 0 0 0-1.4 1.4v2h17.2v-2a1.4 1.4 0 0 0-1.4-1.4zm15.8 5.4H3.4v10.4a1.4 1.4 0 0 0 1.4 1.4h14.4a1.4 1.4 0 0 0 1.4-1.4zm-19.2-4a3.4 3.4 0 0 1 3.4-3.4h14.4a3.4 3.4 0 0 1 3.4 3.4v14.4a3.4 3.4 0 0 1-3.4 3.4H4.8a3.4 3.4 0 0 1-3.4-3.4z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgBrowser;
