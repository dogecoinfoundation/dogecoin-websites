import * as React from "react";
import type { SVGProps } from "react";
const SvgEmbed = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.951 5.036a1 1 0 0 1 .698 1.23l-1.685 6.108v.003l-1.608 5.886a1 1 0 1 1-1.93-.527l1.61-5.889v-.002l1.686-6.11a1 1 0 0 1 1.23-.699m2.958 3.083a1 1 0 0 1 1.415-.017l3.375 3.294a1 1 0 0 1 0 1.431l-3.375 3.294a1 1 0 1 1-1.397-1.431l2.641-2.579-2.641-2.578a1 1 0 0 1-.017-1.414m-9.818 0a1 1 0 0 1-.018 1.414L4.432 12.11l2.641 2.579a1 1 0 1 1-1.397 1.431l-3.374-3.294a1 1 0 0 1 0-1.431l3.374-3.294a1 1 0 0 1 1.415.017"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgEmbed;
