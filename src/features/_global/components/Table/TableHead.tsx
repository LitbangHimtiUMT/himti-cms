import React from "react";

interface ITableHeadProps {
  field: string[];
}

export const TableHead: React.FC<ITableHeadProps> = ({ field }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {field.map((item, index) => (
          <th
            key={index}
            className="border-b border-gray-200 py-3.5 px-5 text-left"
          >
            <span className="text-xs font-semibold uppercase text-gray-600 tracking-wider">
              {item}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
