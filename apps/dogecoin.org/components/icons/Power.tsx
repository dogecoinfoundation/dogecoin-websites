import * as React from "react";
import type { SVGProps } from "react";
const SvgPower = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 3a1 1 0 0 1 1 1v7.5a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1M7.458 5.338A1 1 0 0 1 7.37 6.75a7 7 0 1 0 9.26 0 1 1 0 1 1 1.323-1.5 9 9 0 1 1-11.907 0 1 1 0 0 1 1.412.088"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPower;
