import * as React from "react";
import type { SVGProps } from "react";
const SvgSnowflake = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.104 2.048a1 1 0 0 1 1.414 0L12 4.53l2.48-2.48a1 1 0 1 1 1.415 1.413l-2.895 2.895v3.911l3.388-1.955 1.06-3.955a1 1 0 1 1 1.931.518l-.908 3.389 3.389.908a1 1 0 1 1-.518 1.931l-3.954-1.06L14 12l3.387 1.955 3.954-1.06a1 1 0 0 1 .518 1.933l-3.389.908.908 3.388a1 1 0 1 1-1.932.518l-1.06-3.955L13 13.732v3.91l2.895 2.895a1 1 0 1 1-1.414 1.415L12 19.472l-2.482 2.48a1 1 0 0 1-1.414-1.415L11 17.643v-3.91l-3.386 1.954-1.06 3.955a1 1 0 1 1-1.931-.518l.908-3.388-3.389-.908a1 1 0 0 1 .518-1.932l3.954 1.06L10 12l-3.387-1.955-3.954 1.06a1 1 0 0 1-.518-1.932l3.389-.908-.908-3.39a1 1 0 0 1 1.932-.517l1.06 3.955 3.385 1.955v-3.91L8.104 3.461a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSnowflake;
