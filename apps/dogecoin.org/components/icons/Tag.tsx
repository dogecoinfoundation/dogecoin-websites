import * as React from "react";
import type { SVGProps } from "react";
const SvgTag = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.645 3.402a.77.77 0 0 0-.6.223l-9.42 9.42c-.3.299-.3.784 0 1.084l6.246 6.246c.3.3.785.3 1.084 0l9.42-9.42a.77.77 0 0 0 .223-.6l-.446-5.8a.77.77 0 0 0-.706-.707zM11.63 2.21a2.77 2.77 0 0 1 2.169-.802l5.8.446a2.77 2.77 0 0 1 2.547 2.547l.446 5.8a2.77 2.77 0 0 1-.802 2.169l-9.42 9.42a2.767 2.767 0 0 1-3.913 0L2.21 15.543a2.767 2.767 0 0 1 0-3.913zm3.718 5.437a1 1 0 0 1 1.004-.995h.007a1 1 0 1 1-.01 2h-.007a1 1 0 0 1-.994-1.005"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTag;
