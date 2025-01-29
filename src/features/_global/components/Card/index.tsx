import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

interface CardTitleProps {
  label: string;
  value: string | ReactNode;
  separator: string;
}

interface CardContentProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="text-black flex flex-col gap-4">{children}</div>;
};

export const CardTitle: React.FC<CardTitleProps> = ({
  label,
  value,
  separator,
}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <strong className="min-w-40">{label}</strong>
          {separator ? <p>{separator}</p> : null}
        </div>
        <p className="text-gray-700">{value}</p>
      </div>
    </>
  );
};
