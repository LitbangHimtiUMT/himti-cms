import { formatDate } from "@features/_global/lib/FormatTime";
import { Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { Link, useParams } from "react-router-dom";

interface ItemAcaraProps {
  show?: boolean;
  name: string;
  startTime: Date;
  endTime: Date;
  isOpenAbsen: boolean;
  image: string;
  handleDelete: (id: string) => void;
  id: string;
  link?: string;
}

export const TableItem: React.FC<ItemAcaraProps> = ({
  show,
  name,
  startTime,
  endTime,
  isOpenAbsen,
  image,
  handleDelete,
  link,
  id,
}) => {
  const params = useParams();
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      {image && (
        <td className="py-3 px-5">
          <img
            src={image}
            alt={name}
            className="max-w-[150px] max-h-[150px] object-cover rounded-md"
          />
        </td>
      )}
      <td className="py-3 px-5">
        <div className="flex items-center gap-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-semibold"
          >
            {name}
          </Typography>
        </div>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {formatDate(startTime)} - {formatDate(endTime)}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Chip
          variant="gradient"
          color={isOpenAbsen ? "green" : "red"}
          value={isOpenAbsen ? "Open" : "Close"}
          className="py-0.5 px-2 text-[11px] font-medium w-fit"
        />
      </td>
      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/${link}/${id}`}>
            <Typography
              as="button"
              className="text-xs font-semibold text-blue-600"
            >
              View
            </Typography>
          </Link>
          <Link to={`/admin/acara/${params.id}/sub-acara/update/${id}`}>
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
                `Are you sure you want to delete this ${link}?`
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
