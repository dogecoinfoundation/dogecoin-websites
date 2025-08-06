import * as React from "react";
import type { SVGProps } from "react";
const SvgCompare = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 4.8A2.8 2.8 0 0 1 4.8 2h6.3a2.8 2.8 0 0 1 2.8 2.8v.8h5.3A2.8 2.8 0 0 1 22 8.4v10.8a2.8 2.8 0 0 1-2.8 2.8h-6.3a2.8 2.8 0 0 1-2.8-2.8v-.8H4.8A2.8 2.8 0 0 1 2 15.6zm8.1 11.6v-5.136l-1.443 1.443a1 1 0 0 1-1.414-1.414l.093-.093H5.7a1 1 0 1 1 0-2h1.636l-.093-.093a1 1 0 0 1 1.414-1.414L10.1 9.136V8.4c0-1.194.748-2.214 1.8-2.616V4.8a.8.8 0 0 0-.8-.8H4.8a.8.8 0 0 0-.8.8v10.8a.8.8 0 0 0 .8.8zm2.8-8.8a.8.8 0 0 0-.8.8v10.8a.8.8 0 0 0 .8.8h6.3a.8.8 0 0 0 .8-.8V8.4a.8.8 0 0 0-.8-.8zm3.407 3.693a1 1 0 0 1 0 1.414l-.093.093h1.636a1 1 0 1 1 0 2h-1.636l.093.093a1 1 0 0 1-1.414 1.414l-1.8-1.8a1 1 0 0 1 0-1.414l1.8-1.8a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCompare;
