import * as React from "react";
import type { SVGProps } from "react";
const SvgWaveform = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 3a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1m4 3a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1M8 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1M4 8a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1m16 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgWaveform;
