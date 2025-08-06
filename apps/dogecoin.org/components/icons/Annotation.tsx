import * as React from "react";
import type { SVGProps } from "react";
const SvgAnnotation = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5 4a1 1 0 0 0-1 1v9.304a1 1 0 0 0 1 1h4.75a1 1 0 0 1 .902.568l1.385 2.892 1.522-2.922a1 1 0 0 1 .887-.538H19a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9.304a3 3 0 0 1-3 3h-3.948l-2.165 4.158a1 1 0 0 1-1.789-.03L9.12 17.304H5a3 3 0 0 1-3-3z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgAnnotation;
