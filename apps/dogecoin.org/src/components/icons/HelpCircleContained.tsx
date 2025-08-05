import * as React from "react";
import type { SVGProps } from "react";
const SvgHelpCircleContained = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m10-4.062c-.673 0-1.25.56-1.25 1.292a1 1 0 1 1-2 0c0-1.8 1.438-3.292 3.25-3.292s3.25 1.491 3.25 3.292A3.29 3.29 0 0 1 13 12.365l-.001.686a1 1 0 1 1-2 0v-1.082l.001-.447a1 1 0 0 1 1-1c.673 0 1.25-.56 1.25-1.292S12.673 7.938 12 7.938m-.001 7.562a1 1 0 0 1 1 1v.04a1 1 0 0 1-2 0v-.04a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHelpCircleContained;
