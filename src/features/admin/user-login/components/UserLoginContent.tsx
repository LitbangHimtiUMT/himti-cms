import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useAcaraCreation } from "@features/_global/hooks/useAcara";
import { Button } from "@material-tailwind/react";
import { useAtom } from "jotai";
import { useSearchParams } from "react-router-dom";
import { useUserLogin } from "../hooks/useUserLogin";
import { SendAllState } from "../store/ModalNotificationState";
import { ModalNotification } from "./ModalNotification";
import { TableItem } from "./Table/TableItem";

export const UserLoginContent = () => {
  const { data: userLogin, isLoading } = useUserLogin();
  const [show, setShow] = useAtom(SendAllState);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  const mutation = useAcaraCreation();

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      id,
    });
  };

  const pagination = {
    currentPage: userLogin?.meta?.page || 1,
    totalPages: userLogin?.meta?.totalPages || 1,
    onPageChange,
  };
  console.log(show);
  return (
    <>
      <PageLayout
        title="User Login"
        showPagination={
          !!(
            userLogin?.data?.length &&
            !isLoading &&
            (userLogin.meta?.totalData as number) >
              (userLogin?.meta?.perPage as number)
          )
        }
        // searchField
        searchPlaceholder="Search Acara"
        pagination={pagination}
      >
        <div className="flex flex-col gap-6">
          <div className="w-48">
            <Button
              size="sm"
              color={"green"}
              variant="gradient"
              onClick={() => setShow((prev) => ({ ...prev, show: !prev.show }))}
            >
              Send All Notification
            </Button>
          </div>

          <Table>
            <TableHead field={["Name", "Role", "Action"]} />
            <TableBody>
              {isLoading || mutation.isPending ? (
                <SimpleLoadingTable ColSpan={6} />
              ) : !userLogin?.data?.length ? (
                <tr>
                  <td colSpan={3}>
                    <EmptyData title="User Login" action={false} />
                  </td>
                </tr>
              ) : (
                userLogin?.data.map((item, index) => (
                  <TableItem
                    key={index}
                    show={index !== (userLogin?.data?.length as number) - 1}
                    {...item}
                    handleDelete={handleDelete}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <ModalNotification
          show={show.show}
          id={show.id}
          name={show.name}
          onHide={() =>
            setShow((prev) => ({ ...prev, show: false, id: "", name: "" }))
          }
        />
      </PageLayout>
    </>
  );
};
