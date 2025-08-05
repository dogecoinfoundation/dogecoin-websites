import * as React from "react";
import type { SVGProps } from "react";
const SvgMessageAlertCircle = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 4a8 8 0 0 0-8 8 8 8 0 0 0 11.914 6.978 1 1 0 0 1 .733-.098l3.153.788-.556-3.891a1 1 0 0 1 .075-.546A8 8 0 0 0 20 12a8 8 0 0 0-8-8M2 12C2 6.477 6.477 2 12 2s9.998 4.477 9.998 10c0 1.332-.26 2.605-.735 3.77l.727 5.088a1 1 0 0 1-1.233 1.111l-4.221-1.055A9.96 9.96 0 0 1 11.999 22C6.477 22 2 17.523 2 12m10-4.375a1 1 0 0 1 1 1v.085a1 1 0 1 1-2 0v-.085a1 1 0 0 1 1-1M12 11a1 1 0 0 1 1 1v3.375a1 1 0 1 1-2 0V12a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgMessageAlertCircle;
