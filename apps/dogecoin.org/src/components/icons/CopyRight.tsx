import * as React from "react";
import type { SVGProps } from "react";
const SvgCopyRight = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17 4a2 2 0 0 1 2 2v7.125a1 1 0 1 0 2 0V6a4 4 0 0 0-4-4H9.875a1 1 0 1 0 0 2zm.25 5A3.25 3.25 0 0 0 14 5.75H7.25A3.25 3.25 0 0 0 4 9v9.75A3.25 3.25 0 0 0 7.25 22H14a3.25 3.25 0 0 0 3.25-3.25zM14 7.75c.69 0 1.25.56 1.25 1.25v9.75c0 .69-.56 1.25-1.25 1.25H7.25C6.56 20 6 19.44 6 18.75V9c0-.69.56-1.25 1.25-1.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCopyRight;
