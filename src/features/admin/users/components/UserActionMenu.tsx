import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  canChangeRole?: boolean;
  onChangeRole: (defaultRole?: Role) => void;
  onDelete: () => void;
}

const MENU_WIDTH = 192; // w-48
const ITEM_HEIGHT = 36; // py-2 + text-sm
const GAP = 8;

type MenuPos = {
  top: number;
  left: number;
};

export const UserActionMenu: React.FC<UserActionMenuProps> = ({
  id,
  role,
  canChangeRole = false,
  onChangeRole,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<MenuPos | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const canMakeAdmin = role !== "ADMIN" && role !== "SUPER_ADMIN";

  // Tinggi menu dihitung dari jumlah item yang tampil, supaya flip ke atas
  // nempel ke tombol (bukan ngawang pakai perkiraan 200px).
  const itemCount =
    1 + (canChangeRole && canMakeAdmin ? 1 : 0) + (canChangeRole ? 1 : 0) + 1;
  const menuHeight = itemCount * ITEM_HEIGHT + 1; // +1 divider

  // Tutup saat klik di luar (tombol + menu portal) / tekan Esc
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
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

  // Posisi menu dihitung dari tombol setiap open/resize/scroll, ikut pola
  // DropdownV2: portal ke document.body supaya lolos dari overflow-auto
  // MasterTable, flip ke atas kalau ruang bawah tidak cukup.
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const compute = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;

      const spaceBelow = viewportH - rect.bottom;
      const spaceAbove = rect.top;
      const openUp = spaceBelow < menuHeight + GAP && spaceAbove > spaceBelow;

      const top = openUp
        ? Math.max(GAP, rect.top - menuHeight - GAP)
        : rect.bottom + GAP;
      const left = Math.max(
        GAP,
        Math.min(rect.right - MENU_WIDTH, viewportW - MENU_WIDTH - GAP)
      );

      setPos({ top: Math.round(top), left: Math.round(left) });
    };

    compute();
    const onScroll = () => compute();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", compute);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", compute);
    };
  }, [open, menuHeight]);

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
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="User actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setPos(null);
          setOpen((v) => !v);
        }}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-200 transition"
      >
        <HiOutlineDotsVertical className="w-5 h-5" />
      </button>

      {open &&
        pos &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: MENU_WIDTH,
              zIndex: 9999,
            }}
            className="origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <button
              role="menuitem"
              onClick={handleEdit}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <FiEdit2 className="w-4 h-4 text-yellow-700" />
              <span>Edit</span>
            </button>

            {canChangeRole && canMakeAdmin && (
              <button
                role="menuitem"
                onClick={handleMakeAdmin}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <FiUserCheck className="w-4 h-4 text-blue-700" />
                <span>Make Admin</span>
              </button>
            )}

            {canChangeRole && (
              <button
                role="menuitem"
                onClick={handleChangeRole}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <FiShield className="w-4 h-4 text-indigo-700" />
                <span>Change Role</span>
              </button>
            )}

            <div className="h-px bg-gray-100" />

            <button
              role="menuitem"
              onClick={handleDelete}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>,
          document.body
        )}
    </>
  );
};
