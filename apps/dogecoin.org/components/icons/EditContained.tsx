import * as React from "react";
import type { SVGProps } from "react";
const SvgEditContained = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.389 1.626a2.137 2.137 0 0 1 3.022 0l1.962 1.96c.835.833.836 2.187.001 3.022l-9.263 9.268a2.14 2.14 0 0 1-1.09.584l-4.137.834a1 1 0 0 1-1.178-1.178l.836-4.133c.083-.412.286-.79.583-1.088zm1.609 1.414a.137.137 0 0 0-.195 0L9.54 12.31a.14.14 0 0 0-.037.07l-.537 2.657 2.662-.536a.14.14 0 0 0 .07-.038l9.263-9.268a.137.137 0 0 0 0-.194zM5.411 4.804A2.41 2.41 0 0 0 3 7.215v11.373A2.41 2.41 0 0 0 5.412 21h11.373a2.41 2.41 0 0 0 2.412-2.412v-5.686a1 1 0 0 1 2 0v5.686A4.41 4.41 0 0 1 16.785 23H5.412A4.41 4.41 0 0 1 1 18.588V7.215a4.41 4.41 0 0 1 4.412-4.411h5.686a1 1 0 1 1 0 2z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgEditContained;
