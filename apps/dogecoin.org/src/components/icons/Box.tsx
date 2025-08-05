import * as React from "react";
import type { SVGProps } from "react";
const SvgBox = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.29 3.934A2.59 2.59 0 0 1 6.61 2.5h10.78c.982 0 1.88.555 2.32 1.434l1.46 2.92a3.1 3.1 0 0 1 .33 1.398v10.123c0 1.726-1.4 3.125-3.125 3.125H5.625A3.125 3.125 0 0 1 2.5 18.375V8.252a3.1 3.1 0 0 1 .33-1.398zM4.5 8.75v9.625c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V8.75zm14.382-2H5.118l.96-1.922A.59.59 0 0 1 6.61 4.5h10.78c.225 0 .43.127.531.328zM8.5 11.5a1 1 0 0 1 1-1v2a1 1 0 0 1-1-1m1 0v1h5a1 1 0 1 0 0-2h-5z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgBox;
