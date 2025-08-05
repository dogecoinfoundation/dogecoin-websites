import * as React from "react";
import type { SVGProps } from "react";
const SvgAlertTriangle = (props: SVGProps<SVGSVGElement>) => (
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
      d="m9.964 6.11-5.657 10.2-.025.043c-.271.436-.317.748-.26.941A2.4 2.4 0 0 0 6.33 19h11.34c1.1 0 2.02-.726 2.308-1.706.056-.193.011-.505-.26-.94l-.025-.044-5.657-10.2c-.94-1.48-3.132-1.48-4.072 0m-1.71-1.037c1.72-2.764 5.773-2.764 7.492 0l.026.043 5.658 10.203c.384.625.758 1.548.467 2.538A4.4 4.4 0 0 1 17.67 21H6.33a4.4 4.4 0 0 1-4.227-3.142c-.29-.991.083-1.914.467-2.539L8.228 5.116zM12 7.414a1 1 0 0 1 1 1V12.9a1 1 0 1 1-2 0V8.414a1 1 0 0 1 1-1m0 7.81a1 1 0 0 1 1 1v.04a1 1 0 1 1-2 0v-.04a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgAlertTriangle;
