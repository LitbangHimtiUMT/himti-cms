import React, { useEffect, useState } from "react";
import { Button } from "../../../_global/components/Button";
import { Role } from "@core/model/user";
import { useUserCreation } from "../hooks/useUser";

interface ModalChangeRoleProps {
  show: boolean;
  onHide: () => void;
  id?: string;
  name?: string;
  currentRole?: Role;
  /** Default role yang terpilih saat modal dibuka (misal: "ADMIN" dari tombol "Make Admin") */
  defaultRole?: Role;
}

const ROLE_OPTIONS: Role[] = ["SUPER_ADMIN", "ADMIN", "USER", "ANGGOTA"];

const roleBadgeColor = (role: Role) => {
  switch (role) {
    case "SUPER_ADMIN":
      return "bg-primary-50 text-primary-700 border-primary-200";
    case "ADMIN":
      return "bg-green-50 text-green-700 border-green-200";
    case "ANGGOTA":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const ModalChangeRole: React.FC<ModalChangeRoleProps> = ({
  show,
  onHide,
  id,
  name,
  currentRole,
  defaultRole,
}) => {
  const mutation = useUserCreation();
  const [selectedRole, setSelectedRole] = useState<Role>(
    defaultRole ?? currentRole ?? "ADMIN"
  );

  // Reset selection setiap kali modal dibuka
  useEffect(() => {
    if (show) {
      setSelectedRole(defaultRole ?? currentRole ?? "ADMIN");
    }
  }, [show, defaultRole, currentRole]);

  if (!show) return null;

  const isSameRole = selectedRole === currentRole;

  const handleSubmit = async () => {
    if (!id || isSameRole) return;
    await mutation.mutateAsync({
      type: "update-role",
      id,
      roleData: { role: selectedRole },
    });
    onHide();
  };

  return (
    <div
      onClick={onHide}
      className="fixed backdrop:filter cursor-pointer inset-0 p-4 z-[9999] overflow-auto grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-md transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-dialog="dialog"
        className="flex cursor-default py-5 flex-col px-6 relative w-full sm:min-w-[420px] min-w-[280px] z-[9999] sm:max-w-[480px] h-min overflow-auto rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
      >
        <div className="pb-3 border-b border-gray-100">
          <p className="text-black font-bold text-xl">Ubah Role User</p>
          <p className="text-sm text-gray-500 mt-1">
            Pilih role baru untuk{" "}
            <span className="font-semibold text-black">{name ?? "user ini"}</span>.
          </p>
        </div>

        <div className="flex flex-col gap-4 py-4">
          {currentRole && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Role saat ini:</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold border rounded ${roleBadgeColor(
                  currentRole
                )}`}
              >
                {currentRole}
              </span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-700">
              Pilih role baru:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_OPTIONS.map((role) => {
                const isActive = selectedRole === role;
                const isCurrent = currentRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    disabled={mutation.isPending}
                    onClick={() => setSelectedRole(role)}
                    className={`
                      relative px-3 py-2 rounded-lg border-2 text-sm font-semibold transition-all
                      ${
                        isActive
                          ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {role}
                    {isCurrent && (
                      <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                        current
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {!isSameRole && currentRole && (
            <div className="bg-amber-50 border border-amber-200 rounded-md px-3 py-2 text-xs text-amber-800">
              Role akan diubah dari <b>{currentRole}</b> menjadi{" "}
              <b>{selectedRole}</b>.
            </div>
          )}

          {isSameRole && (
            <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600">
              Role yang dipilih sama dengan role saat ini.
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
          <Button
            variant="secondary"
            onClick={onHide}
            disabled={mutation.isPending}
          >
            <p className="font-medium">Cancel</p>
          </Button>
          <Button
            variant={
              mutation.isPending || isSameRole ? "disabled" : "primary"
            }
            onClick={handleSubmit}
            disabled={mutation.isPending || isSameRole}
          >
            <p className="font-medium">
              {mutation.isPending ? "Loading..." : "Confirm"}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
};
