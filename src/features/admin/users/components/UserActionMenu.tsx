import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FiEdit2,
  FiShield,
  FiUserCheck,
  FiTrash2,
} from "react-icons/fi";
import { Role } from "@core/model/user";

interface UserActionMenuProps {
  id: string;
  name: string;
  role: Role;
  onChangeRole: (defaultRole?: Role) => void;
  onDelete: () => void;
}

export const UserActionMenu: React.FC<UserActionMenuProps> = ({
  id,
  role,
  onChangeRole,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tutup saat klik di luar / tekan Esc
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const canMakeAdmin = role !== "ADMIN" && role !== "SUPER_ADMIN";

  const close = () => setOpen(false);

  const handleEdit = () => {
    close();
    navigate(`/admin/user/update/${id}`);
  };

  const handleMakeAdmin = () => {
    close();
    onChangeRole("ADMIN");
  };

  const handleChangeRole = () => {
    close();
    onChangeRole();
  };

  const handleDelete = () => {
    close();
    onDelete();
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        aria-label="User actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-200 transition"
      >
        <HiOutlineDotsVertical className="w-5 h-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
        >
          <button
            role="menuitem"
            onClick={handleEdit}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <FiEdit2 className="w-4 h-4 text-yellow-700" />
            <span>Edit</span>
          </button>

          {canMakeAdmin && (
            <button
              role="menuitem"
              onClick={handleMakeAdmin}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <FiUserCheck className="w-4 h-4 text-blue-700" />
              <span>Make Admin</span>
            </button>
          )}

          <button
            role="menuitem"
            onClick={handleChangeRole}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <FiShield className="w-4 h-4 text-indigo-700" />
            <span>Change Role</span>
          </button>

          <div className="h-px bg-gray-100" />

          <button
            role="menuitem"
            onClick={handleDelete}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};
