import * as React from "react";
import type { SVGProps } from "react";
const SvgGear = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.514 1.126a1 1 0 0 1 .972 0l9 5A1 1 0 0 1 22 7v10a1 1 0 0 1-.514.874l-9 5a1 1 0 0 1-.972 0l-9-5A1 1 0 0 1 2 17V7a1 1 0 0 1 .514-.874zM4 7.588v8.824l8 4.444 8-4.444V7.588l-8-4.444zm8 2.079c-1.397 0-2.464 1.08-2.464 2.333s1.067 2.333 2.464 2.333 2.464-1.08 2.464-2.333S13.397 9.667 12 9.667M7.536 12c0-2.43 2.035-4.333 4.464-4.333S16.464 9.57 16.464 12 14.43 16.333 12 16.333 7.536 14.43 7.536 12"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgGear;
