import * as React from "react";
import type { SVGProps } from "react";
const SvgDotVertical = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 3.4a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8M8.6 4.8a3.4 3.4 0 1 1 6.8 0 3.4 3.4 0 0 1-6.8 0m3.4 5.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8M8.6 12a3.4 3.4 0 1 1 6.8 0 3.4 3.4 0 0 1-6.8 0m3.4 5.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8m-3.4 1.4a3.4 3.4 0 1 1 6.8 0 3.4 3.4 0 0 1-6.8 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgDotVertical;
