import * as React from "react";
import type { SVGProps } from "react";
const SvgNotificationBox = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.375 4A2.375 2.375 0 0 0 4 6.375v11.25A2.375 2.375 0 0 0 6.375 20h11.25A2.375 2.375 0 0 0 20 17.625v-5.063a1 1 0 0 1 2 0v5.063A4.375 4.375 0 0 1 17.625 22H6.375A4.375 4.375 0 0 1 2 17.625V6.375A4.375 4.375 0 0 1 6.375 2h4.5a1 1 0 1 1 0 2zm11.813 0a1.813 1.813 0 1 0 0 3.625 1.813 1.813 0 0 0 0-3.625m-3.813 1.812a3.812 3.812 0 1 1 7.625 0 3.812 3.812 0 0 1-7.625 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgNotificationBox;
