import { formatDate } from "@features/_global/lib/FormatTime";
import { Chip, Typography } from "@material-tailwind/react";
import React from "react";

interface ItemAcaraProps {
  show?: boolean;
  name: string;
  startTime: Date;
  endTime: Date;
  isOpen: boolean;
  image: string;
  handleDelete: (id: string) => void;
  id: string;
}

export const TableItem: React.FC<ItemAcaraProps> = ({
  show,
  name,
  startTime,
  endTime,
  isOpen,
  image,
  handleDelete,
  id,
}) => {
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      <td className="py-3 px-5">
        <img
          src={image}
          alt={name}
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
          color={isOpen ? "green" : "red"}
          value={isOpen ? "Open" : "Close"}
          className="py-0.5 px-2 text-[11px] font-medium w-fit"
        />
      </td>
      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <Typography
            as="a"
            href="#"
            className="text-xs font-semibold text-blue-gray-600"
          >
            View
          </Typography>
          <Typography
            as="a"
            href="#"
            className="text-xs font-semibold text-blue-gray-600"
          >
            Edit
          </Typography>
          <Typography
            as="a"
            href="#"
            className="text-xs font-semibold text-blue-gray-600"
            onClick={() => handleDelete(id)}
          >
            Delete
          </Typography>
        </div>
      </td>
    </tr>
  );
};
