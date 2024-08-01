import { Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

interface ITableItemProps {
  id: string;
  name: string;
  nidn: number;
  email: string;
  numberPhone: number;
  show?: boolean;
  lesson?: string | null;
  handleDelete: (id: string) => void;
}

export const TableItem: React.FC<ITableItemProps> = ({
  email,
  name,
  nidn,
  numberPhone,
  lesson,
  show,
  id,
  handleDelete,
}) => {
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {nidn}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {name}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {email}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {numberPhone}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {lesson || "-"}
        </Typography>
      </td>
      {/* <td className="py-3 px-5">
        <Chip
          variant="gradient"
          color={isActive ? "green" : "red"}
          value={isActive ? "Active" : "Non-Active"}
          className="py-0.5 px-2 text-[11px] font-medium w-fit"
        />
      </td> */}

      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/dosen/edit/${id}`}>
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
                "Are you sure you want to delete this dosen?"
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
