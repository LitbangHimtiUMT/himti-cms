import React, { PropsWithChildren } from "react";

interface ITableBodyProps extends PropsWithChildren {
  children: React.ReactNode;
}

export const TableBody: React.FC<ITableBodyProps> = ({ children }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  );
};
