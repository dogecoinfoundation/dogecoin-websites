import * as React from "react";
import type { SVGProps } from "react";
const SvgAlarmCheck = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15.992 2.4a1 1 0 0 1 1-1h.768a4.84 4.84 0 0 1 4.84 4.84v.768a1 1 0 1 1-2 0V6.24a2.84 2.84 0 0 0-2.84-2.84h-.768a1 1 0 0 1-1-1m-9.752 1A2.84 2.84 0 0 0 3.4 6.24v.768a1 1 0 1 1-2 0V6.24A4.84 4.84 0 0 1 6.24 1.4h.768a1 1 0 1 1 0 2zM12 5.32a7.448 7.448 0 1 0 0 14.896A7.448 7.448 0 0 0 12 5.32m-9.448 7.448a9.448 9.448 0 0 1 18.896 0 9.4 9.4 0 0 1-2.098 5.936l2.189 2.189a1 1 0 0 1-1.414 1.414l-2.189-2.188A9.4 9.4 0 0 1 12 22.216a9.4 9.4 0 0 1-5.936-2.097l-2.189 2.188a1 1 0 1 1-1.414-1.414l2.188-2.189a9.4 9.4 0 0 1-2.097-5.936m13.155-3.275a1 1 0 0 1 0 1.414l-4.2 4.2a1 1 0 0 1-1.414 0l-1.8-1.8a1 1 0 1 1 1.414-1.414l1.093 1.093 3.493-3.493a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgAlarmCheck;
