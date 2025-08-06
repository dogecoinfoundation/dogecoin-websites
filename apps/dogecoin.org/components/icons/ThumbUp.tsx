import * as React from "react";
import type { SVGProps } from "react";
const SvgThumbUp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 3.905C10 2.853 10.853 2 11.905 2H12a3 3 0 0 1 3 3v4h3.764a3 3 0 0 1 2.683 4.341l-3.5 7A3 3 0 0 1 15.263 22h-4.017a3 3 0 0 1-.728-.09h-.001L6.877 21H5a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h2.131l2.43-3.645A2.6 2.6 0 0 0 10 3.905M6 11H5a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1zm2 8.22v-7.917l3.223-4.836c.49-.733.758-1.59.776-2.467A1 1 0 0 1 13 5v4h-1a1 1 0 1 0 0 2h6.764a1 1 0 0 1 .895 1.447l-3.5 7a1 1 0 0 1-.895.553h-4.018a1 1 0 0 1-.241-.03z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgThumbUp;
