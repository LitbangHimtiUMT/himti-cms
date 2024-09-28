import { Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

interface ItemAcaraProps {
  show?: boolean;
  name: string;
  meetingCount: number;
  handleDelete: (id: string) => void;
  id: string;
  linkDetail?: string;
  linkUpdate?: string;
}

export const TableItem: React.FC<ItemAcaraProps> = ({
  show,
  name,
  meetingCount,
  handleDelete,
  linkDetail,
  linkUpdate,
  id,
}) => {
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
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
          {meetingCount}
        </Typography>
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
                `Are you sure you want to delete this ${name}?`
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
