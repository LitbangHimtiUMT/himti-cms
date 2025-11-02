import React, { ReactNode } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  rounded?: "sm" | "md" | "lg";
  error?: boolean;
  LeftIcon?: ReactNode;
  onClickLeftIcon?: () => void;
  onClickRightIcon?: () => void;
  RightIcon?: ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

export const Input: React.FC<InputProps> = ({
  rounded = "md",
  LeftIcon,
  RightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  error = false,
  inputSize = "md",
  ...rest
}) => {
  const getSizeClasses = () => {
    switch (inputSize) {
      case "sm":
        return "h-9 px-3 py-2 text-sm";
      case "lg":
        return "h-12 px-5 py-3.5 text-base";
      default:
        return "h-11 px-4 py-3 text-sm";
    }
  };

  const getRoundedClasses = () => {
    switch (rounded) {
      case "sm":
        return "rounded-md";
      case "lg":
        return "rounded-xl";
      default:
        return "rounded-lg";
    }
  };

  return (
    <div className="relative w-full">
      {LeftIcon && (
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 z-10"
          onClick={onClickLeftIcon}
        >
          {LeftIcon}
        </div>
      )}
      <input
        {...rest}
        className={`
          w-full
          ${getSizeClasses()}
          ${getRoundedClasses()}
          ${LeftIcon ? "pl-10" : ""}
          ${RightIcon ? "pr-10" : ""}
          ${
            error
              ? "border-2 border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100 text-red-600"
              : "border border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 text-gray-700"
          }
          bg-white
          placeholder:text-gray-400
          placeholder:font-normal
          font-poppins
          outline-none
          transition-all
          duration-200
          disabled:bg-gray-50
          disabled:text-gray-500
          disabled:cursor-not-allowed
        `}
      />
      {RightIcon && (
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200 z-10"
          onClick={onClickRightIcon}
        >
          {RightIcon}
        </div>
      )}
    </div>
  );
};
