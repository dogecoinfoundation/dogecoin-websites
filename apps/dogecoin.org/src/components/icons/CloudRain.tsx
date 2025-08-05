import * as React from "react";
import type { SVGProps } from "react";
const SvgCloudRain = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15 3.4a5 5 0 0 0-4.268 2.394 1 1 0 0 1-1.287.38A3.8 3.8 0 1 0 7.8 13.4h3.6v1.399-1.4H15a5 5 0 0 0 0-10m-2.02 12H15A7 7 0 1 0 9.51 4.057 5.8 5.8 0 1 0 7.8 15.4h3.154l-1.611 2.686a1 1 0 1 0 1.715 1.029l1.8-3a1 1 0 0 0 .122-.715m2.535 2.343a1 1 0 0 1 .343 1.372l-1.8 3a1 1 0 1 1-1.715-1.03l1.8-3a1 1 0 0 1 1.372-.343"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCloudRain;
