import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import { useUser, useUserCreation } from "../hooks/useUser";
import { TableItem } from "./Table/TableItem";

export const UserContent = () => {
  const { data: users, isLoading } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const onPageChange = (page: number) =>
    setSearchParams({ ...queryParams, page: page.toString() });

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
      <Table>
        <TableHead field={["Name", "NIM", "Email", "Role", "Action"]} />
        <TableBody>
          {isLoading ? (
            <SimpleLoadingTable ColSpan={5} />
          ) : (
            <>
              {users?.data?.map((item, key) => (
                <TableItem
                  key={key}
                  handleDelete={handleDelete}
                  {...item}
                  show={key !== (users?.data?.length as number) - 1}
                />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </PageLayout>
  );
};
