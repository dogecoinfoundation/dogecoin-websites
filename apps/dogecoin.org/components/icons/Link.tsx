import * as React from "react";
import type { SVGProps } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.982 8.064a5.43 5.43 0 0 1 3.87-1.611h3.16a1 1 0 1 1 0 2h-3.16A3.45 3.45 0 0 0 3.4 11.987a3.45 3.45 0 0 0 1.008 2.487c.672.683 1.52 1.035 2.427 1.035h3.158a1 1 0 1 1 0 2H6.834c-1.453 0-2.812-.575-3.852-1.63A5.45 5.45 0 0 1 1.4 11.97a5.45 5.45 0 0 1 1.582-3.907l.648.638zm10.006-.553a1 1 0 0 1 1-1h3.159c1.456 0 2.833.596 3.852 1.63a5.54 5.54 0 0 1 1.6 3.88 5.45 5.45 0 0 1-5.452 5.526h-3.159a1 1 0 1 1 0-2h3.159a3.451 3.451 0 0 0 3.453-3.503v-.015c0-.93-.37-1.818-1.026-2.484a3.4 3.4 0 0 0-2.427-1.034h-3.159a1 1 0 0 1-1-1m3.74 5.447H7.252a1 1 0 1 1 0-2h9.476a1 1 0 1 1 0 2"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgLink;
