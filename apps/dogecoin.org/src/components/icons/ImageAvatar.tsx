import * as React from "react";
import type { SVGProps } from "react";
const SvgImageAvatar = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.25 4C4.607 4 4 4.564 4 5.368v13.264c0 .318.095.599.25.822v-1.267a3.25 3.25 0 0 1 3.25-3.25h9a3.25 3.25 0 0 1 3.25 3.25v1.267a1.43 1.43 0 0 0 .25-.822V5.368C20 4.564 19.393 4 18.75 4zm12.5 16v-1.813c0-.69-.56-1.25-1.25-1.25h-9c-.69 0-1.25.56-1.25 1.25v1.688q0 .063-.008.125zM2 5.368C2 3.557 3.407 2 5.25 2h13.5C20.593 2 22 3.557 22 5.368v13.264C22 20.443 20.593 22 18.75 22H5.25C3.407 22 2 20.443 2 18.632zm10 2.007A1.813 1.813 0 1 0 12 11a1.813 1.813 0 0 0 0-3.625M8.188 9.187a3.812 3.812 0 1 1 7.624 0 3.812 3.812 0 0 1-7.624 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgImageAvatar;
