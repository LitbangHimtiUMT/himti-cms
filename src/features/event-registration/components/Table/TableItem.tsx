import { EventRegistrationModel } from "@core/model/event-registration";
import { Button } from "@features/_global/components/Button";
import { Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface ITableItemProps extends EventRegistrationModel {
  linkUpdate: string;
  linkDetail?: string;
  show: boolean;
  handleDelete: (id: string) => void;
}

export const TableItem: React.FC<ITableItemProps> = ({
  id,
  name,
  class: className,
  material,
  createdAt,
  linkUpdate,
  linkDetail,
  handleDelete,
}) => {
  const onClickDelete = () => {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      handleDelete(id);
    }
  };

  return (
    <tr className="hover:bg-primary-50/30 transition-colors duration-150">
      <td className="py-3 px-5 text-sm text-gray-700">
        <Typography variant="small" className="font-medium text-gray-800">
          {name}
        </Typography>
      </td>
      <td className="py-3 px-5 text-sm text-gray-700">
        <Typography variant="small" className="text-gray-600 font-medium">
          {className}
        </Typography>
      </td>
      <td className="py-3 px-5 text-sm text-gray-700">
        <Typography variant="small" className="text-gray-600 font-medium">
          {material || "-"}
        </Typography>
      </td>
      <td className="py-3 px-5 text-sm text-gray-700">
        <Typography variant="small" className="text-gray-600 font-medium">
          {createdAt ? format(new Date(createdAt), "dd MMM yyyy") : '-'}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <div className="flex gap-2">
          {linkDetail && (
            <Link to={linkDetail}>
              <Button size="sm" variant="primary" rounded="md">
                Detail
              </Button>
            </Link>
          )}
          <Link to={linkUpdate}>
            <Button size="sm" variant="warning" rounded="md">
              Edit
            </Button>
          </Link>
          <Button
            size="sm"
            variant="danger"
            rounded="md"
            onClick={onClickDelete}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};
