import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useSearchParams } from "react-router-dom";
import {
  useEventRegistration,
  useEventRegistrationCreation,
} from "../hooks/useEventRegistration";
import { TableItem } from "./Table/TableItem";

export const EventRegistrationContent = () => {
  const { data: eventRegistrations, isLoading } = useEventRegistration();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const mutation = useEventRegistrationCreation();

  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };
  const pagination = {
    currentPage: eventRegistrations?.meta?.page || 1,
    totalPages: eventRegistrations?.meta?.totalPages || 1,
    onPageChange,
  };

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      data: {
        eventRegistrationId: id,
      },
    });
  };

  return (
    <>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Registration",
          link: { to: "/admin/event-registration/create" },
        }}
        title="Event Registration"
        showPagination={
          !!(
            eventRegistrations?.data?.length &&
            !isLoading &&
            (eventRegistrations.meta?.totalData as number) >
              (eventRegistrations?.meta?.perPage as number)
          )
        }
        searchField
        searchPlaceholder="Search Registration..."
        pagination={pagination}
      >
        <Table>
          <TableHead
            field={["Name", "Class", "Material", "Created At", "Action"]}
          />
          <TableBody>
            {isLoading ? (
              <SimpleLoadingTable ColSpan={5} />
            ) : !eventRegistrations?.data?.length ? (
              <tr>
                <td colSpan={5}>
                  <EmptyData title="Event Registration" action />
                </td>
              </tr>
            ) : (
              eventRegistrations?.data.map((item, index) => (
                <TableItem
                  linkUpdate={`/admin/event-registration/update/${item.id}`}
                  key={index}
                  show={index !== (eventRegistrations?.data?.length as number) - 1}
                  {...item}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </PageLayout>
    </>
  );
};
