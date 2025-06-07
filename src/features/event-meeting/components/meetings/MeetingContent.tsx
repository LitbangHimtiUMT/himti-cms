import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { convertQueryParamsToObject } from "@features/_global/helper";
import { useParams, useSearchParams } from "react-router-dom";

import { useEventMeetingById } from "@features/event-meeting/hooks/useEventMeeting";
import { TableItem } from "./Table/TableItem";
import { useMeetingCreation } from "@features/event-meeting/hooks/useMeeting";

export const MeetingContent = () => {
  const { eventMeetingId } = useParams();
  const { data: meetings, isLoading } = useEventMeetingById();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const mutation = useMeetingCreation()

  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };
  const pagination = {
    currentPage: meetings?.meta?.page || 1,
    totalPages: meetings?.meta?.totalPages || 1,
    onPageChange,
  };

  const handleDelete = async(id:string) => {
    await mutation.mutateAsync({
      type: "delete",
      data: {
        meetingId: id
      }
    })
  }

  return (
    <>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Meeting",
          link: { to: `/admin/event-meeting/${eventMeetingId}/meeting/create` },
        }}
        title={`Event Meeting ${meetings?.data?.name || ""}`}
        showPagination={
          !!(
            meetings?.data?.Meeting?.length &&
            !isLoading &&
            (meetings.meta?.totalData as number) >
              (meetings?.meta?.perPage as number)
          )
        }
        searchField
        searchPlaceholder="Search Acara"
        pagination={pagination}
      >
        <Table>
          <TableHead field={["Name", "Description", "Time", "Class", "Action"]} />
          <TableBody>
            {isLoading ? (
              <SimpleLoadingTable ColSpan={3} />
            ) : !meetings?.data?.Meeting?.length ? (
              <tr>
                <td colSpan={6}>
                  <EmptyData title="Event Meeting" action />
                </td>
              </tr>
            ) : (
              meetings?.data.Meeting.map((item, index) => (
                <TableItem
                  linkDetail={`/admin/event-meeting/${eventMeetingId}/${item.id}`}
                  linkUpdate={`/admin/event-meeting/${eventMeetingId}/meeting/update/${item.id}`}
                  key={index}
                  show={
                    index !== (meetings?.data?.Meeting?.length as number) - 1
                  }
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
