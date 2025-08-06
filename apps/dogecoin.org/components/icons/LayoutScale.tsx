import * as React from "react";
import type { SVGProps } from "react";
const SvgLayoutScale = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6 3.4A2.6 2.6 0 0 0 3.4 6v6.2h5.824a2.575 2.575 0 0 1 2.575 2.575V20.6H18a2.6 2.6 0 0 0 2.6-2.6V6A2.6 2.6 0 0 0 18 3.4zm3.8 17.2v-5.825a.575.575 0 0 0-.576-.575H3.4V18A2.6 2.6 0 0 0 6 20.6zM1.4 6A4.6 4.6 0 0 1 6 1.4h12A4.6 4.6 0 0 1 22.6 6v12a4.6 4.6 0 0 1-4.6 4.6H6A4.6 4.6 0 0 1 1.4 18z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLayoutScale;
