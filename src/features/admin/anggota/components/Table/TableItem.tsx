import { Chip, Typography } from "@material-tailwind/react";
import React from "react";

interface IAnggotaItemProps {
  id: string;
  name: string;
  nim: number;
  angkatan: {
    id: string;
    year: number;
  };
  email: string | null;
  isActive: boolean;
  show?: boolean;
}

export const TableItem: React.FC<IAnggotaItemProps> = ({
  angkatan,
  email,
  show,
  isActive,
  name,
  nim,
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
          {angkatan.year}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {email || "-"}
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
