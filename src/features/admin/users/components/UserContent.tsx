import { PageLayout } from "@features/_global/components/PageLayout";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { MasterTable } from "../../../_global/components/Table/Master";
import { Poppins } from "../../../_global/components/Text";
import { useUser } from "../hooks/useUser";
import { Badge } from "../../../_global/components/Badges";
import { useState } from "react";
import { Role } from "@core/model/user";
import { ModalChangeRole } from "./ModalChangeRole";
import { ModalDeleteUser } from "./ModalDeleteUser";
import { UserActionMenu } from "./UserActionMenu";

type UserFilter = "all" | "pic";

interface SelectedUser {
  id: string;
  name: string;
  role: Role;
}

export const UserContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const [filter, setFilter] = useState<UserFilter>("all");
  const { data: users, isLoading } = useUser({
    ...(filter &&
      filter !== "all" && {
        roles: JSON.stringify(["ADMIN", "SUPER_ADMIN"]),
      }),
  });

  // State modal
  const [roleModal, setRoleModal] = useState<{
    show: boolean;
    user?: SelectedUser;
    defaultRole?: Role;
  }>({ show: false });
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    user?: SelectedUser;
  }>({ show: false });

  const onPageChange = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });

  const changeFilterEvent = (filter: UserFilter) => {
    setFilter(filter);
    onPageChange(1);
  };

  const openRoleModal = (user: SelectedUser, defaultRole?: Role) => {
    setRoleModal({ show: true, user, defaultRole });
  };

  const closeRoleModal = () => setRoleModal({ show: false });

  const openDeleteModal = (user: SelectedUser) => {
    setDeleteModal({ show: true, user });
  };

  const closeDeleteModal = () => setDeleteModal({ show: false });

  const pagination = {
    currentPage: users?.meta?.page || 1,
    totalPages: users?.meta?.totalPages || 1,
    onPageChange,
  };

  return (
    <>
      <PageLayout
        title="Users"
        action={{
          show: true,
          buttonTitle: "Create User",
          link: { to: "/admin/user/create" },
        }}
        showPagination={
          !!(
            users?.data?.length &&
            !isLoading &&
            (users.meta?.totalData as number) > (users?.meta?.perPage as number)
          )
        }
        pagination={pagination}
        searchField
        searchPlaceholder="Search Users"
      >
        <div className="flex items-center gap-5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => changeFilterEvent("all")}
          >
            <input
              type="radio"
              name="radio-1"
              className="radio w-5 h-5"
              checked={filter === "all"}
              readOnly
            />
            <p>All</p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => changeFilterEvent("pic")}
          >
            <input
              type="radio"
              name="radio-1"
              className="radio w-5 h-5"
              checked={filter === "pic"}
              readOnly
            />
            <p>PIC</p>
          </div>
        </div>
        <MasterTable
          title={["Name", "NIM", "Email", "Role", "Status", "Action"]}
          data={users?.data || []}
          columnTable={[
            {
              return: (item) => <Poppins>{item.name}</Poppins>,
            },
            {
              return: (item) => <Poppins>{item.nim}</Poppins>,
            },
            {
              return: (item) => <Poppins>{item.email}</Poppins>,
            },
            {
              return: (item) => (
                <Badge
                  variant={
                    item.role === "SUPER_ADMIN"
                      ? "primary"
                      : item.role === "ADMIN"
                      ? "success"
                      : item.role === "ANGGOTA"
                      ? "warning"
                      : "secondary"
                  }
                  size="sm"
                >
                  {item.role}
                </Badge>
              ),
            },
            {
              return: (item) => (
                <Badge variant={item.isLogin ? "success" : "danger"} size="sm">
                  {item.isLogin ? "Online" : "Offline"}
                </Badge>
              ),
            },
            {
              return: (item) => {
                const selected: SelectedUser = {
                  id: item.id,
                  name: item.name,
                  role: item.role,
                };
                return (
                  <UserActionMenu
                    id={item.id}
                    name={item.name}
                    role={item.role}
                    onChangeRole={(defaultRole) =>
                      openRoleModal(selected, defaultRole)
                    }
                    onDelete={() => openDeleteModal(selected)}
                  />
                );
              },
            },
          ]}
        />
      </PageLayout>

      <ModalChangeRole
        show={roleModal.show}
        onHide={closeRoleModal}
        id={roleModal.user?.id}
        name={roleModal.user?.name}
        currentRole={roleModal.user?.role}
        defaultRole={roleModal.defaultRole}
      />

      <ModalDeleteUser
        show={deleteModal.show}
        onHide={closeDeleteModal}
        id={deleteModal.user?.id}
        name={deleteModal.user?.name}
      />
    </>
  );
};
