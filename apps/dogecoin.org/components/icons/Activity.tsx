import * as React from "react";
import type { SVGProps } from "react";
const SvgActivity = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10.037 4a1 1 0 0 1 .957.7l3.255 10.362.763-3.603a1 1 0 0 1 .978-.793H20a1 1 0 1 1 0 2h-3.2l-1.384 6.541a1 1 0 0 1-1.932.093L10.053 8.376 8.956 11.96a1 1 0 0 1-.956.707H4a1 1 0 1 1 0-2h3.26l1.824-5.959A1 1 0 0 1 10.037 4"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgActivity;
