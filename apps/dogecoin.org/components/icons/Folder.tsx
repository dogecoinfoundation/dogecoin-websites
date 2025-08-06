import * as React from "react";
import type { SVGProps } from "react";
const SvgFolder = (props: SVGProps<SVGSVGElement>) => (
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
      d="m3.4 5.059.001 3.358v9.524a1 1 0 0 0 1 1H19.6a1 1 0 0 0 1-1V8.012h-8.516a1 1 0 0 1-.73-.316L8.885 5.059zm-2 0a2 2 0 0 1 2-2H9.32a1 1 0 0 1 .73.316l2.468 2.637H20.6a2 2 0 0 1 2 2v9.93a3 3 0 0 1-3 2.999H4.4a3 3 0 0 1-3-3V5.059"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgFolder;
