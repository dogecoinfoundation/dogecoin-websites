import * as React from "react";
import type { SVGProps } from "react";
const SvgVariant = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 5.053 5.053 12 12 18.947 18.947 12zm-1.323-1.505a1.87 1.87 0 0 1 2.646 0l7.129 7.13-.707.706.707-.707c.73.73.73 1.915 0 2.646l-7.13 7.129a1.87 1.87 0 0 1-2.645 0l-7.129-7.13a1.87 1.87 0 0 1 0-2.645z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgVariant;
