import * as React from "react";
import type { SVGProps } from "react";
const SvgColorPicker = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19.937 4.063a2.26 2.26 0 0 0-3.199 0L13.04 7.76l3.2 3.2 3.697-3.698a2.26 2.26 0 0 0 0-3.2m-2.283 8.31 3.698-3.697a4.26 4.26 0 0 0 0-6.028l-.707.707.707-.707a4.26 4.26 0 0 0-6.028 0l-3.698 3.698-.446-.446a1 1 0 1 0-1.414 1.414l.446.446-8.52 8.52a1 1 0 0 0-.292.707V21.6a1 1 0 0 0 1 1h4.613a1 1 0 0 0 .707-.293l8.52-8.52.446.447A1 1 0 0 0 18.1 12.82zm-2.829 0-3.199-3.198L3.4 17.4V20.6h3.199z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgColorPicker;
