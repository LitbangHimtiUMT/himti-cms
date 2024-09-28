import { formatTime } from "@features/_global/lib/FormatTime";
import { Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

interface ItemAcaraProps {
  show?: boolean;
  name: string;
  startTime: Date;
  endTime: Date;
  isOpenAbsen: boolean;
  image: string;
  handleDelete: (id: string) => void;
  id: string;
  linkDetail?: string;
  linkUpdate?: string;
  title?: "Acara" | "Sub Acara";
}

export const TableItem: React.FC<ItemAcaraProps> = ({
  show,
  name,
  startTime,
  endTime,
  isOpenAbsen,
  image,
  handleDelete,
  linkDetail,
  linkUpdate,
  id,
  title = "Acara",
}) => {

  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      {image && title === "Acara" && (
        <td className='py-3 px-5'>
          <img
            src={image}
            alt={name}
            className='max-w-[150px] max-h-[150px] object-cover rounded-md'
          />
        </td>
      )}
      <td className='py-3 px-5'>
        <div className='flex items-center gap-4'>
          <Typography
            variant='small'
            color='blue-gray'
            className='font-semibold'
          >
            {name}
          </Typography>
        </div>
      </td>
      <td className='py-3 px-5'>
        <Typography className='text-xs font-semibold text-blue-gray-600'>
          {formatTime(startTime)} - {formatTime(endTime)}
        </Typography>
      </td>
      <td className='py-3 px-5'>
        <Chip
          variant='gradient'
          color={isOpenAbsen ? "green" : "red"}
          value={isOpenAbsen ? "Open" : "Close"}
          className='py-0.5 px-2 text-[11px] font-medium w-fit'
        />
      </td>
      <td className='py-3 px-5'>
        <div className='flex items-center gap-2'>
          <Link to={linkDetail as string}>
            <Typography
              as='button'
              className='text-xs font-semibold text-blue-600'
            >
              View
            </Typography>
          </Link>
          <Link to={linkUpdate as string}>
            <Typography
              as='button'
              className='text-xs font-semibold text-yellow-900'
            >
              Edit
            </Typography>
          </Link>
          <Typography
            as='button'
            className='text-xs font-semibold text-red-600'
            onClick={() => {
              const confirm = window.confirm(
                `Are you sure you want to delete this ${title}?`
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
