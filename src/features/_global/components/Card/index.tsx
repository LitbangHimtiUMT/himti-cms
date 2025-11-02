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
    <div className="bg-white shadow-soft hover:shadow-soft-lg rounded-xl p-6 border border-gray-100 transition-all duration-300">
      <h2 className="text-lg font-bold text-gray-800 mb-6 pb-3 border-b border-gray-100">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="text-gray-700 flex flex-col gap-4">{children}</div>;
};

export const CardTitle: React.FC<CardTitleProps> = ({
  label,
  value,
  separator,
}) => {
  return (
    <div className="flex items-start gap-3 py-2 hover:bg-gray-50 px-3 -mx-3 rounded-lg transition-colors duration-150">
      <div className="flex items-center gap-2 min-w-[160px]">
        <strong className="text-sm font-semibold text-gray-800">{label}</strong>
        {separator && <span className="text-gray-400">{separator}</span>}
      </div>
      <div className="text-sm text-gray-700 flex-1">{value}</div>
    </div>
  );
};
