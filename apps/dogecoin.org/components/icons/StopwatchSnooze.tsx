import * as React from "react";
import type { SVGProps } from "react";
const SvgStopwatchSnooze = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.5 2a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1m9.889.806a1 1 0 0 1 1.414 0l2.504 2.504a1 1 0 0 1-1.414 1.415l-.545-.546-1.082 1.083a9.58 9.58 0 0 1 2.234 6.167C21.5 18.707 17.255 23 12 23s-9.5-4.293-9.5-9.571c0-5.279 4.245-9.572 9.5-9.572 2.199 0 4.22.752 5.829 2.013l1.105-1.105-.545-.545a1 1 0 0 1 0-1.414M12 5.857c-4.134 0-7.5 3.382-7.5 7.572S7.866 21 12 21s7.5-3.382 7.5-7.571c0-4.19-3.366-7.572-7.5-7.572m-2.587 6.056a1 1 0 1 1 0-2H14.5a1 1 0 0 1 .707 1.707L11.827 15H14.5a1 1 0 1 1 0 2H9.413a1 1 0 0 1-.707-1.707l3.38-3.38z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgStopwatchSnooze;
