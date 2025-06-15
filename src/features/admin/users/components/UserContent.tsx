import { PageLayout } from "@features/_global/components/PageLayout";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { Typography } from "@material-tailwind/react";
import { Link, useSearchParams } from "react-router-dom";
import { MasterTable } from "../../../_global/components/Table/Master";
import { Poppins } from "../../../_global/components/Text";
import { useUser, useUserCreation } from "../hooks/useUser";
import { Badge } from "../../../_global/components/Badges";
import { useState } from "react";

type UserFilter = "all" | "pic";

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
  const onPageChange = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });

  const changeFilterEvent = (filter: UserFilter) => {
    setFilter(filter);
    onPageChange(1);
  };

  const mutation = useUserCreation();

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const pagination = {
    currentPage: users?.meta?.page || 1,
    totalPages: users?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
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
            return: (item) => <Poppins>{item.role}</Poppins>,
          },
          {
            return: (item) => (
              <Badge variant={item.isLogin ? "success" : "danger"} size="sm">
                {item.isLogin ? "Online" : "Offline"}
              </Badge>
            ),
          },
          {
            return: (item) => (
              <>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/user/update/${item.id}`}>
                    <Typography
                      as="button"
                      className="text-xs font-semibold text-yellow-900"
                    >
                      Edit
                    </Typography>
                  </Link>
                  <Typography
                    as="button"
                    className="text-xs font-semibold text-red-600"
                    onClick={() => {
                      const confirm = window.confirm(
                        "Are you sure you want to delete this anggota?"
                      );
                      if (!confirm) return;
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </Typography>
                </div>
              </>
            ),
          },
        ]}
      />
    </PageLayout>
  );
};
