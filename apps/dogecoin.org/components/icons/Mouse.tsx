import * as React from "react";
import type { SVGProps } from "react";
const SvgMouse = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.065 3.366C8.38 2.103 10.156 1.4 12 1.4s3.62.703 4.935 1.966A6.65 6.65 0 0 1 19 8.16v7.68c0 1.806-.748 3.53-2.065 4.794C15.62 21.897 13.844 22.6 12 22.6s-3.62-.703-4.935-1.966A6.65 6.65 0 0 1 5 15.84V8.16c0-1.806.748-3.53 2.065-4.794M12 3.4a5.13 5.13 0 0 0-3.55 1.408A4.65 4.65 0 0 0 7 8.16v7.68c0 1.249.516 2.456 1.45 3.352.935.897 2.211 1.408 3.55 1.408s2.615-.511 3.55-1.408A4.65 4.65 0 0 0 17 15.84V8.16a4.65 4.65 0 0 0-1.45-3.352A5.13 5.13 0 0 0 12 3.4m0 3.4a1 1 0 0 1 1 1v2.4a1 1 0 1 1-2 0V7.8a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgMouse;
