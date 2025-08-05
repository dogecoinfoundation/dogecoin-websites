import * as React from "react";
import type { SVGProps } from "react";
const SvgCart = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.4 2.993a1 1 0 0 1 1-1h2.292a1 1 0 0 1 .966.738l.886 3.274H21.6a1 1 0 0 1 .98 1.202l-1.72 8.31a1 1 0 0 1-.855.79L8.542 17.74a1 1 0 0 1-1.09-.73L3.928 3.992H2.4a1 1 0 0 1-1-1m5.686 5.012 2.07 7.643 9.89-1.236 1.326-6.407zM10.5 20a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m-2.5.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0m10.5-.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1m-2.5.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCart;
