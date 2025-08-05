import * as React from "react";
import type { SVGProps } from "react";
const SvgDisc = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2M1.4 12C1.4 6.146 6.146 1.4 12 1.4S22.6 6.146 22.6 12 17.854 22.6 12 22.6 1.4 17.854 1.4 12M12 10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8M8.6 12a3.4 3.4 0 1 1 6.8 0 3.4 3.4 0 0 1-6.8 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDisc;
