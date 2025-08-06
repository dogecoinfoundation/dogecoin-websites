import * as React from "react";
import type { SVGProps } from "react";
const SvgNotificationBubble = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.093 5C7.973 5 5 7.684 5 10.588s2.974 5.589 7.093 5.589c.63 0 1.24-.065 1.818-.187a1 1 0 0 1 .912.271l1.328 1.327v-1.823a1 1 0 0 1 .44-.829c1.206-.815 2.126-2.014 2.443-3.195a1 1 0 0 1 1.932.518c-.42 1.566-1.494 2.997-2.815 4.016V20a1 1 0 0 1-1.706.708l-2.665-2.661q-.822.129-1.687.13C7.273 18.176 3 14.96 3 10.587S7.273 3 12.093 3q.565 0 1.113.056a1 1 0 0 1-.202 1.99 9 9 0 0 0-.91-.046M17.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M14 7.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgNotificationBubble;
