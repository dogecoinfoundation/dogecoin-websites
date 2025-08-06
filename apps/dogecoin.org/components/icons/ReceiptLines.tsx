import * as React from "react";
import type { SVGProps } from "react";
const SvgReceiptLines = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.2 4.8C3.2 3.393 4.217 2 5.76 2h12.48c1.543 0 2.56 1.393 2.56 2.8V21a1 1 0 0 1-1.57.822l-2.03-1.406-2.03 1.406a1 1 0 0 1-1.14 0L12 20.416l-2.03 1.406a1 1 0 0 1-1.14 0L6.8 20.416l-2.03 1.406A1 1 0 0 1 3.2 21zM5.76 4c-.18 0-.56.219-.56.8v14.291l1.03-.713a1 1 0 0 1 1.14 0l2.03 1.406 2.03-1.406a1 1 0 0 1 1.14 0l2.03 1.406 2.03-1.406a1 1 0 0 1 1.14 0l1.03.713V4.8c0-.581-.38-.8-.56-.8zM6.8 7.8a1 1 0 0 1 1-1h8.4a1 1 0 0 1 0 2H7.8a1 1 0 0 1-1-1m0 4.8a1 1 0 0 1 1-1h8.4a1 1 0 0 1 0 2H7.8a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgReceiptLines;
