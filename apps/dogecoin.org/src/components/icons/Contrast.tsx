import * as React from "react";
import type { SVGProps } from "react";
const SvgContrast = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.4 12C1.4 6.146 6.146 1.4 12 1.4S22.6 6.146 22.6 12 17.854 22.6 12 22.6 1.4 17.854 1.4 12M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2m-1 3.1A1.5 1.5 0 0 1 12.5 5a6.5 6.5 0 0 1 6.5 6.5v1a6.5 6.5 0 0 1-6.5 6.5 1.5 1.5 0 0 1-1.5-1.5zm2 .527v9.946a4.5 4.5 0 0 0 4-4.473v-1a4.5 4.5 0 0 0-4-4.473"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgContrast;
