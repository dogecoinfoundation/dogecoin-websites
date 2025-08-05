import * as React from "react";
import type { SVGProps } from "react";
const SvgCompass = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2M1.4 12C1.4 6.146 6.146 1.4 12 1.4S22.6 6.146 22.6 12 17.854 22.6 12 22.6 1.4 17.854 1.4 12m14.805-4.204a1 1 0 0 1 .281.856l-.848 5.648a1 1 0 0 1-.84.84l-5.649.849a1 1 0 0 1-1.137-1.138l.848-5.648a1 1 0 0 1 .84-.84l5.649-.849a1 1 0 0 1 .856.282m-5.477 2.435-.538 3.579 3.58-.538.538-3.58z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCompass;
