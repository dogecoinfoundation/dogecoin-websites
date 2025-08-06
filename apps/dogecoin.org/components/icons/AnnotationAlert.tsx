import * as React from "react";
import type { SVGProps } from "react";
const SvgAnnotationAlert = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.25 4C4.56 4 4 4.56 4 5.25v8.804c0 .69.56 1.25 1.25 1.25h4.5a1 1 0 0 1 .902.568l1.385 2.892 1.522-2.922a1 1 0 0 1 .887-.538h4.304c.69 0 1.25-.56 1.25-1.25V5.25C20 4.56 19.44 4 18.75 4zM2 5.25A3.25 3.25 0 0 1 5.25 2h13.5A3.25 3.25 0 0 1 22 5.25v8.804a3.25 3.25 0 0 1-3.25 3.25h-3.698l-2.165 4.158a1 1 0 0 1-1.789-.03L9.12 17.304H5.25A3.25 3.25 0 0 1 2 14.054zm10 .125a1 1 0 0 1 1 1V9.75a1 1 0 1 1-2 0V6.375a1 1 0 0 1 1-1m0 6.665a1 1 0 0 1 1 1v.085a1 1 0 1 1-2 0v-.085a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgAnnotationAlert;
