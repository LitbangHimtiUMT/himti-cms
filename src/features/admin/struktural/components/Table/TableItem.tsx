import { AnggotaModel } from "@core/model/anggota";
import { formatDate } from "@features/_global/lib/FormatTime";
import { Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { Jabatan } from "../../model/struktural";

interface ItemAcaraProps {
  show?: boolean;
  id: string;
  jabatan: Jabatan;
  image: string;
  anggotaId: string;
  isActive: boolean;
  departmentId: string | null;
  createdAt: string;
  updatedAt: string;
  anggota: AnggotaModel;
  handleDelete: (id: string) => void;
}

export const TableItem: React.FC<ItemAcaraProps> = ({
  show,
  anggota,
  jabatan,
  image,
  handleDelete,
  id,
}) => {
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      <td className="py-3 px-5">
        <img
          src={image}
          alt={anggota.name}
          className="max-w-[150px] max-h-[150px] object-cover rounded-md"
        />
      </td>
      <td className="py-3 px-5">
        <div className="flex items-center gap-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-semibold"
          >
            {anggota.name}
          </Typography>
        </div>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {anggota.nim}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {jabatan}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/acara/edit/${id}`}>
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
                "Are you sure you want to delete this acara?"
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
