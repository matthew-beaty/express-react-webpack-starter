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
  let backgroundColor = isPrimary ? colors.blue : colors.white;
  backgroundColor = isDisabled ? colors.grey : backgroundColor;

  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        color: isPrimary ? colors.white : colors.black,
        padding: "8px",
        borderRadius: "4px",
        cursor: isDisabled ? "default" : "pointer",
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
