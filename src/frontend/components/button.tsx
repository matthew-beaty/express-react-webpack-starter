import React from "react";
import colors from "../theme/colors";

// const style = {};

interface ButtonProps {
  children: any;
  isPrimary?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  onClick,
  isPrimary = true,
  isDisabled = false,
}: ButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: isPrimary ? colors.blue : colors.white,
        color: isPrimary ? colors.white : colors.black,
        padding: "8px",
        borderRadius: "4px",
        cursor: "pointer",
        border: "none",
        margin: "2px",
        fontSize: "14px",
      }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
