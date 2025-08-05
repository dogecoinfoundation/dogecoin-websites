import * as React from "react";
import type { SVGProps } from "react";
const SvgEmail = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 7.333C2 5.527 3.421 4 5.25 4h13.5C20.579 4 22 5.527 22 7.333v9.334C22 18.473 20.579 20 18.75 20H5.25C3.421 20 2 18.473 2 16.667zM5.358 6l6.585 4.728q.03.021.057.02a.08.08 0 0 0 .057-.02L18.642 6zM20 7.476q-.048.046-.104.086l-6.672 4.79a2.09 2.09 0 0 1-2.448 0l-6.672-4.79A1 1 0 0 1 4 7.476v9.19C4 17.439 4.594 18 5.25 18h13.5c.656 0 1.25-.562 1.25-1.333z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgEmail;
