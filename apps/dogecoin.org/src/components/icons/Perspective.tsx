import * as React from "react";
import type { SVGProps } from "react";
const SvgPerspective = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19.061 3.404 13 4.162v6.843h7.6V4.688c0-.68-.641-1.349-1.539-1.284M22.6 4.688c0-1.954-1.75-3.44-3.723-3.275l-.041.004L4.447 3.215C2.798 3.385 1.4 4.724 1.4 6.487v11.035c0 1.764 1.398 3.101 3.047 3.273l14.389 1.797a1 1 0 0 0 .53-.078c1.722-.017 3.234-1.472 3.234-3.313zm-2 8.317H13v6.843l5.6.7a1 1 0 0 1 .539-.052c.69.126 1.46-.463 1.46-1.295zM11 19.598v-6.593H3.4v4.517c0 .63.514 1.21 1.26 1.284l.024.003zm-7.6-8.593H11V4.41l-6.316.79-.025.002c-.745.075-1.26.654-1.26 1.284z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgPerspective;
