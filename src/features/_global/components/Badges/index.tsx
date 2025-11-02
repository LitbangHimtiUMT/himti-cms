
import clsx from "clsx";
import { ReactNode } from "react";
import { Poppins } from "../Text";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "outline"
  | "ghost";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
  rounded?: "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700 border border-gray-200",
  primary: "bg-primary-50 text-primary-700 border border-primary-200",
  secondary: "bg-purple-50 text-purple-700 border border-purple-200",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  danger: "bg-red-50 text-red-700 border border-red-200",
  outline: "border border-gray-300 text-gray-700 bg-white",
  ghost: "text-gray-700 hover:bg-gray-100",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

const sizeText = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}

const roundedClasses = {
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const Badge = ({
  variant = "default",
  className,
  children,
  rounded = "md",
  size = "md",
  icon,
  iconPosition = "left",
}: BadgeProps) => {
  return (
    <div
      className={clsx(
        "inline-flex items-center font-medium whitespace-nowrap transition-all duration-200",
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-1.5">{icon}</span>
      )}
      <Poppins className={`font-poppins ${sizeText[size]}`}>
        {children}
      </Poppins>
      {icon && iconPosition === "right" && (
        <span className="ml-1.5">{icon}</span>
      )}
    </div>
  );
};