import * as React from "react";
import type { SVGProps } from "react";
const SvgSuperscript = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19.303 5.697a1.4 1.4 0 0 0-1.4 1.4 1 1 0 1 1-2 0 3.4 3.4 0 1 1 6.8 0c0 .664-.29 1.178-.589 1.56-.216.274-.499.55-.73.777q-.095.091-.174.17a1 1 0 0 1-.067.061l-1.478 1.232h2.038a1 1 0 1 1 0 2h-4.8a1 1 0 0 1-.64-1.768l3.565-2.971q.124-.124.228-.224c.207-.203.358-.351.486-.514.15-.192.161-.278.161-.323a1.4 1.4 0 0 0-1.4-1.4M1.693 7.505a1 1 0 0 1 1.414 0l4.98 4.98 4.98-4.98a1 1 0 1 1 1.414 1.414L9.5 13.9l4.98 4.98a1 1 0 0 1-1.414 1.414l-4.98-4.98-4.98 4.98a1 1 0 1 1-1.414-1.414l4.98-4.98-4.98-4.98a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSuperscript;
