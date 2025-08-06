import * as React from "react";
import type { SVGProps } from "react";
const SvgKeyboard = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.4 8.4A3.4 3.4 0 0 1 4.8 5h14.4a3.4 3.4 0 0 1 3.4 3.4v7.2a3.4 3.4 0 0 1-3.4 3.4H4.8a3.4 3.4 0 0 1-3.4-3.4zM4.8 7a1.4 1.4 0 0 0-1.4 1.4v7.2A1.4 1.4 0 0 0 4.8 17h14.4a1.4 1.4 0 0 0 1.4-1.4V8.4A1.4 1.4 0 0 0 19.2 7zm.8 3.2a1 1 0 0 1 1-1h.028a1 1 0 0 1 0 2H6.6a1 1 0 0 1-1-1m3.6 0a1 1 0 0 1 1-1h.028a1 1 0 1 1 0 2H10.2a1 1 0 0 1-1-1m3.6 0a1 1 0 0 1 1-1h.028a1 1 0 1 1 0 2H13.8a1 1 0 0 1-1-1m3.572 0a1 1 0 0 1 1-1h.028a1 1 0 1 1 0 2h-.028a1 1 0 0 1-1-1M7.4 13.8a1 1 0 0 1 1-1h.028a1 1 0 1 1 0 2H8.4a1 1 0 0 1-1-1m3.6 0a1 1 0 0 1 1-1h.028a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1m3.6 0a1 1 0 0 1 1-1h.028a1 1 0 1 1 0 2H15.6a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgKeyboard;
