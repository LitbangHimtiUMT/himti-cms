import { Role } from "@core/model/user";
import { Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

interface IAnggotaItemProps {
  id: string;
  name: string;
  nim: string;
  email?: string;
  role: Role;
  show?: boolean;
  status?: boolean;
  handleDelete: (id: string) => void;
}

export const TableItem: React.FC<IAnggotaItemProps> = ({
  email,
  status,
  role,
  show,
  name,
  nim,
  id,
  handleDelete,
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
        <Typography className="text-xs font-semibold ext text-blue-gray-600">
          {email}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold ext text-blue-gray-600">
          {role}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Chip
          variant="gradient"
          color={status ? "green" : "red"}
          value={status ? "Online" : "Offline"}
          className="py-0.5 px-2 text-[11px] font-medium w-fit"
        />
      </td>

      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/user/update/${id}`}>
            <Typography
              as="button"
              className="text-xs font-semibold text-yellow-900"
            >
              Edit
            </Typography>
          </Link>
          <Typography
            as="button"
            className="text-xs font-semibold text-red-600"
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to delete this anggota?"
              );
              if (!confirm) return;
              handleDelete(id);
            }}
          >
            Delete
          </Typography>
        </div>
      </td>
    </tr>
  );
};
