import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  width?: string;
  height?: string;
  text?: string;
  borderRadius?: number;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  color = "bg-blue-500",
  width = "100",
  height = "h-10",
  borderRadius = 40,
  className = "",
  disabled = false,
  children,
  ...rest
}) => {
  return (
    <button
      className={`
        bg-${color}-500 ${height} 
        cursor-pointer
        text-white font-semibold flex items-center justify-center 
        transition-all duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed 
        active:scale-95 ${className}
        hover:bg-${color}-800
      `}
      style={{ borderRadius: `${borderRadius}px` , width: `${width}px`}}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
