import * as React from "react";
import type { SVGProps } from "react";
const SvgHelp = (props: SVGProps<SVGSVGElement>) => (
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
      d="m7.094 5.68 2.6 2.6a4.38 4.38 0 0 1 4.611 0l2.601-2.6a8.004 8.004 0 0 0-9.812 0M18.32 7.094l-2.6 2.6a4.38 4.38 0 0 1 0 4.611l2.6 2.601a8.004 8.004 0 0 0 0-9.812M16.906 18.32l-2.6-2.6a4.38 4.38 0 0 1-4.611 0l-2.601 2.6a8.004 8.004 0 0 0 9.812 0M5.68 16.906l2.6-2.6a4.38 4.38 0 0 1 0-4.611l-2.6-2.601a8.004 8.004 0 0 0 0 9.812M4.929 4.929c3.905-3.905 10.237-3.905 14.142 0s3.905 10.237 0 14.142-10.237 3.905-14.142 0-3.905-10.237 0-14.142m8.75 5.392a2.375 2.375 0 1 0-3.358 3.359 2.375 2.375 0 0 0 3.358-3.36"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHelp;
