import * as React from "react";
import type { SVGProps } from "react";
const SvgCoinNumber = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7 6.998a7.982 7.982 0 1 0 10.006 9.99q.084-.014.168-.042A7.982 7.982 0 1 0 7 6.998m2.302-.361h.079a7.98 7.98 0 0 1 7.981 8.062 5.982 5.982 0 1 0-8.06-8.062m.079 2a5.982 5.982 0 1 0 0 11.963 5.982 5.982 0 0 0 0-11.964m.466 2.04a1 1 0 0 1 .534.885v4.564h.418a1 1 0 1 1 0 2H7.857a1 1 0 0 1 0-2h.524v-2.663l-.179.123a1 1 0 1 1-1.133-1.648l1.745-1.2c.306-.21.704-.234 1.033-.061"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCoinNumber;
