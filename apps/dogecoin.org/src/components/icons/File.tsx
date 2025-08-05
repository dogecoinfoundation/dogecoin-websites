import * as React from "react";
import type { SVGProps } from "react";
const SvgFile = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.333 4C6.563 4 6 4.594 6 5.25v13.5c0 .656.562 1.25 1.333 1.25h9.334c.77 0 1.333-.594 1.333-1.25V9.625h-3.667c-1.162 0-2.166-.917-2.166-2.125V4zm6.834.25V7.5c0 .023.008.049.036.076s.072.049.13.049h3.352l-.063-.064-3.3-3.182q-.072-.07-.155-.129M4 5.25C4 3.421 5.527 2 7.333 2h6.034c.872 0 1.716.334 2.344.94l3.3 3.181A3.2 3.2 0 0 1 20 8.432V18.75c0 1.829-1.527 3.25-3.333 3.25H7.333C5.527 22 4 20.579 4 18.75z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgFile;
