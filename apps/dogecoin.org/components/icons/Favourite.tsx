import * as React from "react";
import type { SVGProps } from "react";
const SvgFavourite = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v14.883c0 1.296-1.533 1.982-2.5 1.119l-5-4.467-5 4.467c-.967.863-2.5.177-2.5-1.12zm3-1a1 1 0 0 0-1 1v13.766l4.834-4.318a1 1 0 0 1 1.332 0L17 18.766V5a1 1 0 0 0-1-1zm.79 2.484a1 1 0 0 1 1-1h5.417a1 1 0 1 1 0 2H8.79a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgFavourite;
