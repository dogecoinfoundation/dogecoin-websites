import * as React from "react";
import type { SVGProps } from "react";
const SvgPaperclip = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5 7.714a5.071 5.071 0 1 1 10.143 0v6.215a3.143 3.143 0 0 1-6.286 0v-6a1 1 0 1 1 2 0v6a1.143 1.143 0 0 0 2.286 0V7.714a3.071 3.071 0 0 0-6.143 0v6.643a5 5 0 1 0 10 0V7.93a1 1 0 1 1 2 0v6.428a7 7 0 1 1-14 0z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPaperclip;
