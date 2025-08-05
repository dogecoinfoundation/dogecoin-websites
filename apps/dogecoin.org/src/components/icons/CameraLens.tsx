import * as React from "react";
import type { SVGProps } from "react";
const SvgCameraLens = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.579 2.025a5.8 5.8 0 0 1 2.62-.625h9.6a5.8 5.8 0 0 1 5.8 5.8v9.6a5.8 5.8 0 0 1-5.8 5.8H7.2a5.8 5.8 0 0 1-5.8-5.8V7.2a5.8 5.8 0 0 1 2.67-4.884 1 1 0 0 1 .51-.291m-.213 2.644A3.8 3.8 0 0 0 3.4 7.2v7.4h4.749zM9.576 16.6h3.876l-1.177 4H7.2a3.8 3.8 0 0 1-3.8-3.8v-.2zm4.784 4h2.44a3.8 3.8 0 0 0 3.8-3.8v-2.683a1 1 0 0 1-.155-.085l-3.472-2.315zm.87-10.045-3.224-2.15-.597.46-.031.022-2.57 1.824 1.481 3.889h3.75zM8.072 8.781 6.086 3.566A3.8 3.8 0 0 1 7.2 3.4h8.038l-5.033 3.867zM18.16 3.65q-.068.077-.15.142l-4.33 3.326 6.92 4.613V7.2a3.8 3.8 0 0 0-2.44-3.55"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCameraLens;
