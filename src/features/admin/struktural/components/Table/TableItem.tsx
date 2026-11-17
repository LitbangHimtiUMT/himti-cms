import { AnggotaModel } from "@core/model/anggota";
import { Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Department,
  Jabatan,
  isStrukturalSigner,
} from "../../model/struktural";

interface ItemAcaraProps {
  show?: boolean;
  id: string;
  jabatan: Jabatan;
  department?: Department | null;
  signatureImage?: string | null;
  image: string;
  memberId: string;
  isActive: boolean;
  Member: AnggotaModel;
  handleDelete: (id: string) => void;
}

export const TableItem: React.FC<ItemAcaraProps> = ({
  show,
  Member,
  jabatan,
  department,
  signatureImage,
  image,
  handleDelete,
  id,
}) => {
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      <td className="py-3 px-5">
        <img
          src={image}
          alt={Member?.name}
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
            {Member?.name ?? '-'}
          </Typography>
        </div>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {Member?.nim}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <div className="flex flex-col gap-1">
          <Typography className="text-xs font-semibold text-blue-gray-600">
            {jabatan}
          </Typography>
          {isStrukturalSigner(jabatan, department) && !signatureImage && (
            <Chip
              variant="gradient"
              color="red"
              value="TTD belum diupload"
              className="py-0.5 px-2 text-[11px] font-medium w-fit"
            />
          )}
        </div>
      </td>
      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/struktural/edit/${id}`}>
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
