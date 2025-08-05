import * as React from "react";
import type { SVGProps } from "react";
const SvgTrain = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 1.2a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1M2.6 7.765A3.965 3.965 0 0 1 6.565 3.8h10.87A3.965 3.965 0 0 1 21.4 7.765v9.67a3.96 3.96 0 0 1-1.542 3.139l1.247 1.588a1 1 0 1 1-1.573 1.235l-1.593-2.029a4 4 0 0 1-.504.032H6.5l-1.5 2a1 1 0 0 1-1.6-1.2l1.055-1.407A3.96 3.96 0 0 1 2.6 17.435zM11 5.8H6.565C5.48 5.8 4.6 6.68 4.6 7.765v5.055a1 1 0 0 1 .2-.02H11zm2 7v-7h4.435c1.086 0 1.965.88 1.965 1.965V12.8zm6.4 2H4.8a1 1 0 0 1-.2-.02v2.655c0 1.085.88 1.965 1.965 1.965h10.87c1.086 0 1.965-.88 1.965-1.965zm-11 1a1 1 0 0 1 1 1v.072a1 1 0 1 1-2 0V16.8a1 1 0 0 1 1-1m7.2 0a1 1 0 0 1 1 1v.072a1 1 0 1 1-2 0V16.8a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTrain;
