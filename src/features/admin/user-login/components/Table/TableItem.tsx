import { UserLoginModel } from "@core/model/user-login";
import { Typography } from "@material-tailwind/react";
import { useAtom } from "jotai";
import React from "react";
import { SendAllState } from "../../store/ModalNotificationState";

interface UserLoginProps extends UserLoginModel {
  show?: boolean;
  handleDelete: (id: string) => void;
}

export const TableItem: React.FC<UserLoginProps> = ({
  user,
  show,
  id,
  handleDelete,
}) => {
  const [, setState] = useAtom(SendAllState);
  return (
    <tr key={id} className={`${show ? "border-b border-blue-gray-50" : ""}`}>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {user.name}
        </Typography>
      </td>
      <td className="py-3 px-5">
        <Typography className="text-xs font-semibold text-blue-gray-600">
          {user.role}
        </Typography>
      </td>

      <td className="py-3 px-5">
        <div className="flex items-center gap-2">
          <Typography
            as="button"
            className="text-xs font-semibold text-white px-2 py-0.5 bg-green-600 rounded-md"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                id,
                name: user.name,
                show: true,
              }));
            }}
          >
            SEND
          </Typography>
          <Typography
            as="button"
            className="text-xs font-semibold text-red-600"
            onClick={() => {
              const confirm = window.confirm(
                `Are you sure you want to delete this ${user.name}?`
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
