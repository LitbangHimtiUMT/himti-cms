import { ReactNode } from "react";

interface IPoppinsProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  fontSize?: string | number;
  color?: string
}

export const Poppins: React.FC<IPoppinsProps> = ({
  children,
  fontSize,
  color,
  ...rest
}) => {
  return (
    <p
      id="poppins"
      {...rest}
      style={{
        ...rest.style,
        fontSize,
        color
      }}
    >
      {children}
    </p>
  );
};
