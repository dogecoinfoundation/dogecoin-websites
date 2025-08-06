import * as React from "react";
import type { SVGProps } from "react";
const SvgShare = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10.927 4.219a1 1 0 0 1 1.025.047l9.6 6.36a1 1 0 0 1 .035 1.643l-9.6 6.96a1 1 0 0 1-1.587-.809v-2.77c-1.684.05-3.201.826-4.4 1.725a12.7 12.7 0 0 0-2.066 1.958l-.106.132-.024.03-.004.005a1.001 1.001 0 0 1-1.8-.6h1l-1-.001v-.039l.003-.088a12.1 12.1 0 0 1 .141-1.372c.141-.878.424-2.074.995-3.337 1.084-2.401 3.208-5.029 7.261-6.147V5.1a1 1 0 0 1 .527-.881M4.54 15.975q.128-.1.26-.2c1.597-1.197 3.956-2.413 6.724-2.067a1 1 0 0 1 .876.992v1.76l6.845-4.964L12.4 6.962V8.7a1 1 0 0 1-.79.978c-3.83.82-5.702 3.112-6.649 5.209-.167.37-.306.737-.42 1.088"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgShare;
