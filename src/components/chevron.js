import React from "react"

const Chevron = ({ style, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11 12"
    className={className || ``}
    style={{ shapeRendering: "geometricprecision", ...(style || {}) }}
  >
    <path
      fillRule="evenodd"
      fill="currentColor"
      d="M3.97 4.03a.75.75 0 0 1 1.06-1.06l2.5 2.5a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06-1.06L5.94 6 3.97 4.03z"
    ></path>
  </svg>
)

export default Chevron
