import { Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

interface ItemAcaraProps {
  show?: boolean;
  user: {
    name: string;
    nim: string;
  };
  image: string;
  id: number;
}

export const TableItem: React.FC<ItemAcaraProps> = ({
  show,
  user,
  image,
  id,
}) => {
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      <td className="py-3 px-5">
        <img
          src={image}
          alt={user.name}
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
            {user.name}
          </Typography>
        </div>
      </td>
      <td className="py-3 px-5">
        <div className="flex items-center gap-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-semibold"
          >
            {user.nim}
          </Typography>
        </div>
      </td>
      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <Link to={`/admin/absensi/${id}`}>
            <Typography
              as="button"
              className="text-xs font-semibold text-blue-600"
            >
              View
            </Typography>
          </Link>
        </div>
      </td>
    </tr>
  );
};
