import React from "react";

export const CloverIcon = ({ className = "w-6 h-6", color = "#ff493b" }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="17" cy="17" r="9" fill={color} />
      <circle cx="31" cy="17" r="9" fill={color} />
      <circle cx="17" cy="31" r="9" fill={color} />
      <circle cx="31" cy="31" r="9" fill={color} />
      <circle cx="24" cy="24" r="5.5" fill={color} />
    </svg>
  );
};

export default CloverIcon;
