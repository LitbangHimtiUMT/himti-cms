import { Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

interface ITableItemProps {
  id: string;
  name: string;
  nim: string;
  email: string;
  role: string;
  show?: boolean;
  handleDelete: (id: string) => void;
}

export const TableItem: React.FC<ITableItemProps> = ({
  email,
  name,
  nim,
  role,
  show,
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
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {email}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Chip
          variant="gradient"
          color={
            role === "ANGGOTA" ? "green" : role === "ADMIN" ? "blue" : "amber"
          }
          value={role}
          className="py-0.5 px-2 text-[11px] font-medium w-fit text-white"
        />
      </td>

      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          {role !== "ADMIN" && (
            <>
              <Link to={`/admin/anggota/edit/${id}`}>
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
                    "Are you sure you want to delete this user?"
                  );
                  if (!confirm) return;
                  handleDelete(id);
                }}
              >
                Delete
              </Typography>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
