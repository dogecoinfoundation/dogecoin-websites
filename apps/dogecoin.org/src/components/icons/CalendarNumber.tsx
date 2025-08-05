import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendarNumber = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.31 2a1 1 0 0 1 1 1v.543h8.19V3a1 1 0 1 1 2 0v.67c1.74.457 3 2.074 3 3.959v10.285c0 2.23-1.764 4.086-4 4.086h-10c-2.235 0-4-1.856-4-4.086V7.63c0-1.815 1.169-3.383 2.81-3.903V3a1 1 0 0 1 1-1m.19 3.543c-1.078 0-2 .907-2 2.086v.285h14V7.63c0-1.18-.922-2.086-2-2.086zm12 4.371h-14v8c0 1.179.922 2.086 2 2.086h10c1.078 0 2-.907 2-2.086zm-6.124 1.16A1 1 0 0 1 14 12v4.143h.5a1 1 0 1 1 0 2h-3a1 1 0 1 1 0-2h.5v-1.734a1 1 0 0 1-1.217-1.563l1.5-1.543a1 1 0 0 1 1.093-.23"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCalendarNumber;
