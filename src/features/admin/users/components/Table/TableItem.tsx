import { Chip, Typography } from "@material-tailwind/react";
import React from "react";

interface ITableItemProps {
  id: string;
  name: string;
  nim: string;
  email: string;
  role: string;
  show?: boolean;
}

export const TableItem: React.FC<ITableItemProps> = ({
  email,
  name,
  nim,
  role,
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
          {nim}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {email}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Chip
          variant="gradient"
          color={
            role === "ANGGOTA" ? "green" : role === "ADMIN" ? "blue" : "red"
          }
          value={role}
          className="py-0.5 px-2 text-[11px] font-medium w-fit"
        />
      </td>

      <td className="py-3 px-5">
        {role.toUpperCase() !== "ADMIN" && (
          <Typography
            as="a"
            href="#"
            className="text-xs font-semibold text-blue-gray-600"
          >
            Edit
          </Typography>
        )}
      </td>
    </tr>
  );
};
