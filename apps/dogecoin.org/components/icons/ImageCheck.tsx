import * as React from "react";
import type { SVGProps } from "react";
const SvgImageCheck = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 6.306A4.306 4.306 0 0 1 6.306 2h8.265a1 1 0 1 1 0 2H6.306A2.306 2.306 0 0 0 4 6.306v11.02c0 1.15.84 2.102 1.94 2.278l9.048-8.516a1 1 0 0 1 1.392.021l3.252 3.252V9.612a1 1 0 1 1 2 0v7.714a4.306 4.306 0 0 1-4.306 4.307H6.306A4.306 4.306 0 0 1 2 17.326zm17.633 10.812a1 1 0 0 1-.259-.186l-3.722-3.723-6.824 6.424h8.498a2.306 2.306 0 0 0 2.306-2.307zm2.074-14.274a1 1 0 0 1 0 1.414L17.85 8.115a1 1 0 0 1-1.415 0l-1.652-1.653a1 1 0 1 1 1.415-1.414l.945.946 3.15-3.15a1 1 0 0 1 1.414 0M7.96 7.306a.653.653 0 1 0 0 1.306.653.653 0 0 0 0-1.306m-2.653.653a2.653 2.653 0 1 1 5.306 0 2.653 2.653 0 0 1-5.306 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgImageCheck;
