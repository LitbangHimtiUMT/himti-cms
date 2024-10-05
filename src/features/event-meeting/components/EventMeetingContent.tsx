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
  useEventMeeting,
  useEventMeetingCreation,
} from "../hooks/useEventMeeting";
import { TableItem } from "./Table/TableItem";

export const EventMeetingContent = () => {
  const { data: eventMeetings, isLoading } = useEventMeeting();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const mutation = useEventMeetingCreation();

  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };
  const pagination = {
    currentPage: eventMeetings?.meta?.page || 1,
    totalPages: eventMeetings?.meta?.totalPages || 1,
    onPageChange,
  };

  const handleDelete = async (id: string) => {
    await mutation.mutateAsync({
      type: "delete",
      data: {
        eventMeetingId: id,
      },
    });
  };

  return (
    <>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Event Meeting",
          link: { to: "/admin/event-meeting/create" },
        }}
        title="Event Meeting"
        showPagination={
          !!(
            eventMeetings?.data?.length &&
            !isLoading &&
            (eventMeetings.meta?.totalData as number) >
              (eventMeetings?.meta?.perPage as number)
          )
        }
        searchField
        searchPlaceholder="Search Acara"
        pagination={pagination}
      >
        <Table>
          <TableHead
            field={["Name", "Description", "Meeting Count", "Action"]}
          />
          <TableBody>
            {isLoading ? (
              <SimpleLoadingTable ColSpan={3} />
            ) : !eventMeetings?.data?.length ? (
              <tr>
                <td colSpan={6}>
                  <EmptyData title="Event Meeting" action />
                </td>
              </tr>
            ) : (
              eventMeetings?.data.map((item, index) => (
                <TableItem
                  linkDetail={`/admin/event-meeting/${item.id}`}
                  linkUpdate={`/admin/event-meeting/update/${item.id}`}
                  key={index}
                  show={index !== (eventMeetings?.data?.length as number) - 1}
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
