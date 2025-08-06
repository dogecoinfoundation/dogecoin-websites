import * as React from "react";
import type { SVGProps } from "react";
const SvgShuffle = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.966 3.275a1 1 0 0 1 1.414.037l2.345 2.471a1 1 0 0 1 0 1.377L19.38 9.632a1 1 0 1 1-1.45-1.377l.743-.783h-1.165c-.767 0-1.487.37-1.933.994L14.501 9.97a1 1 0 1 1-1.627-1.163l1.074-1.503a4.38 4.38 0 0 1 3.56-1.832h1.165l-.744-.784a1 1 0 0 1 .037-1.413M2 6.853a1 1 0 0 1 1-1h2.795c1.413 0 2.739.683 3.56 1.832l6.22 8.709a2.38 2.38 0 0 0 1.933.994h1.165l-.744-.783a1 1 0 1 1 1.45-1.377l2.346 2.472a1 1 0 0 1 0 1.377l-2.345 2.471a1 1 0 1 1-1.45-1.376l.742-.784h-1.164a4.38 4.38 0 0 1-3.56-1.832l-6.22-8.708a2.38 2.38 0 0 0-1.933-.995H3a1 1 0 0 1-1-1m8.082 7.91a1 1 0 0 1 .232 1.394l-.96 1.343a4.38 4.38 0 0 1-3.56 1.832H3a1 1 0 1 1 0-2h2.795c.767 0 1.487-.37 1.932-.994l.96-1.343a1 1 0 0 1 1.395-.233"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgShuffle;
