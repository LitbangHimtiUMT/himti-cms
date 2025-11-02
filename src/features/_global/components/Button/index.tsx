import { ReactNode } from "react";
import { generateSize } from "./utils";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "disabled"
    | "warning";
  rounded?: "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<IButtonProps> = ({
  children,
  variant = "primary",
  rounded = "md",
  size = "md",
  ...rest
}) => {
  const getVariantClasses = () => {
    const baseClasses = "font-medium transition-all duration-200 focus:outline-none focus:ring-4";

    switch (variant) {
      case "primary":
        return `${baseClasses} bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 focus:ring-primary-200 active:translate-y-0`;
      case "secondary":
        return `${baseClasses} bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-200`;
      case "danger":
        return `${baseClasses} bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5 focus:ring-red-200 active:translate-y-0`;
      case "success":
        return `${baseClasses} bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5 focus:ring-green-200 active:translate-y-0`;
      case "warning":
        return `${baseClasses} bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg hover:-translate-y-0.5 focus:ring-amber-200 active:translate-y-0`;
      case "disabled":
        return `${baseClasses} bg-gray-200 text-gray-500 border border-gray-300 ${!rest.onClick ? 'cursor-not-allowed' : 'hover:bg-gray-300 cursor-pointer'} focus:ring-gray-100`;
      default:
        return baseClasses;
    }
  };

  const getRoundedClasses = () => {
    switch (rounded) {
      case "sm":
        return "rounded-md";
      case "md":
        return "rounded-lg";
      case "lg":
        return "rounded-xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-lg";
    }
  };

  return (
    <button
      {...rest}
      disabled={variant === "disabled" && !rest.onClick}
      onClick={(e) =>
        variant === "disabled" && !rest.onClick ? e.preventDefault() : rest?.onClick?.(e)
      }
      className={`
        ${getVariantClasses()}
        ${getRoundedClasses()}
        ${generateSize(size)}
        w-full
        font-poppins
        inline-flex items-center justify-center gap-2
      `}
    >
      {children}
    </button>
  );
};
