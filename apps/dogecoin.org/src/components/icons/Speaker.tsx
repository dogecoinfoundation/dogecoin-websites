import * as React from "react";
import type { SVGProps } from "react";
const SvgSpeaker = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 6.375C3 3.944 4.998 2 7.429 2h9.142C19.002 2 21 3.944 21 6.375v11.25C21 20.056 19.002 22 16.571 22H7.43C4.998 22 3 20.056 3 17.625zM7.429 4C6.072 4 5 5.078 5 6.375v11.25C5 18.922 6.072 20 7.429 20h9.142C17.928 20 19 18.922 19 17.625V6.375C19 5.078 17.928 4 16.571 4zM11 6.375a1 1 0 0 1 1-1h.081a1 1 0 0 1 1 1v.072a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1zm1 5.5c-1.356 0-2.429 1.078-2.429 2.375s1.073 2.375 2.429 2.375 2.429-1.078 2.429-2.375-1.073-2.375-2.429-2.375M7.571 14.25c0-2.431 1.998-4.375 4.429-4.375s4.429 1.944 4.429 4.375S14.43 18.625 12 18.625s-4.429-1.944-4.429-4.375"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSpeaker;
