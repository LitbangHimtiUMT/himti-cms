import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import { CreateAdminUserBodyDTO, Role } from "@core/model/user";
import InputGroup from "@features/_global/components/Input/InputGroup";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import { useProfile } from "@features/auth/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { useUserById, useUserCreation } from "../hooks/useUser";

const InitialValue: CreateAdminUserBodyDTO = {
  name: "",
  email: "",
  role: "ADMIN",
};

const ROLE_OPTIONS: Role[] = ["SUPER_ADMIN", "ADMIN", "USER", "ANGGOTA"];

export const FormUpdateUserAdmin: React.FC = () => {
  const mutation = useUserCreation();
  const { data: user, isLoading } = useUserById();

  // Hanya SUPER_ADMIN yang boleh mengganti role (pola yang sama dengan
  // ModalChangeRole). Admin biasa tidak melihat pemilih role sama sekali,
  // jadi tidak bisa menaikkan akun mana pun jadi SUPER_ADMIN dari form ini.
  const { data: profile } = useProfile();
  const canAssignSuperAdmin = profile?.data?.role === "SUPER_ADMIN";
  const visibleRoles = ROLE_OPTIONS.filter(
    (role) => role !== "SUPER_ADMIN" || canAssignSuperAdmin
  );

  const [userBody, setUserBody] = useState<CreateAdminUserBodyDTO>(InitialValue);

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateAdminUserBodyDTO, string>>
  >({});

  const navigate = useNavigate();

  // Sync state saat data user ter-fetch
  useEffect(() => {
    if (user?.data) {
      setUserBody({
        name: user.data.name ?? "",
        email: user.data.email ?? "",
        role: (user.data.role as Role) ?? "ADMIN",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync({
      type: "admin-update",
      adminData: userBody,
    });
  };

  const handleReset = () => {
    if (user?.data) {
      setUserBody({
        name: user.data.name ?? "",
        email: user.data.email ?? "",
        role: (user.data.role as Role) ?? "ADMIN",
      });
    } else {
      setUserBody(InitialValue);
    }
    setErrors({});
  };

  const handleRoleChange = (role: Role) => {
    setUserBody((prev) => ({ ...prev, role }));
  };

  return (
    <PageLayout
      title="Update User"
      headBackground="amber"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      {isLoading ? (
        <SimpleLoadingTable isTable={false} />
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <InputGroup
              mb={false}
              disabled={mutation.isPending || isLoading}
              type="text"
              label="Name"
              variant="outlined"
              error={errors.name}
              value={userBody.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserBody({ ...userBody, name: e.target.value })
              }
            />
          </div>
          <div>
            <InputGroup
              mb={false}
              disabled={mutation.isPending || isLoading}
              type="email"
              label="Email"
              variant="outlined"
              error={errors.email}
              value={userBody.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserBody({ ...userBody, email: e.target.value })
              }
            />
          </div>

          {canAssignSuperAdmin && (
            <div>
              <Typography className="text-xs font-semibold text-blue-gray-600 mb-2">
                Role:
              </Typography>
              <ButtonGroup variant="outlined" size="sm">
                {visibleRoles.map((role) => (
                  <Button
                    key={role}
                    type="button"
                    disabled={mutation.isPending}
                    className={`${
                      userBody.role === role
                        ? "bg-amber-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleRoleChange(role)}
                  >
                    {role}
                  </Button>
                ))}
              </ButtonGroup>
              {user?.data?.role && userBody.role !== user.data.role && (
                <Typography className="text-xs text-amber-700 mt-2">
                  Role akan diubah dari{" "}
                  <b>{user.data.role}</b> menjadi <b>{userBody.role}</b>.
                </Typography>
              )}
            </div>
          )}

          <div className="flex justify-center items-center gap-5">
            <Button
              type="button"
              disabled={mutation.isPending}
              onClick={handleReset}
              variant="outlined"
              fullWidth
            >
              Reset
            </Button>
            <Button
              className="text-white"
              type="submit"
              variant="gradient"
              color="amber"
              fullWidth
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Loading..." : "Update"}
            </Button>
          </div>
        </form>
      )}
    </PageLayout>
  );
};
