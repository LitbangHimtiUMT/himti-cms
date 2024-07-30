import { Chip, Typography } from "@material-tailwind/react";
import React from "react";

interface ITableItemProps {
  id: string;
  name: string;
  nidn: number;
  email: string;
  isActive: boolean;
  show?: boolean;
  lesson?: string | null;
}

export const TableItem: React.FC<ITableItemProps> = ({
  email,
  name,
  isActive,
  nidn,
  lesson,
  show,
  id,
}) => {
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {name}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {nidn}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {email}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {lesson || "-"}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Chip
          variant="gradient"
          color={isActive ? "green" : "red"}
          value={isActive ? "Active" : "Non-Active"}
          className="py-0.5 px-2 text-[11px] font-medium w-fit"
        />
      </td>

      <td className="py-3 px-5">
        <Typography
          as="a"
          href="#"
          className="text-xs font-semibold text-blue-gray-600"
        >
          Edit
        </Typography>
      </td>
    </tr>
  );
};
