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

import { TableItem } from "./Table/TableItem";
import { useMeeting } from "@features/event-meeting/hooks/useMeeting";

export const MeetingContent = () => {
  const { data: meetings, isLoading } = useMeeting();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());

  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };
  const pagination = {
    currentPage: meetings?.meta?.page || 1,
    totalPages: meetings?.meta?.totalPages || 1,
    onPageChange,
  };
  return (
    <>
      <PageLayout
        action={{
          show: true,
          buttonTitle: "Create Meeting",
          link: { to: "/admin/meeting/create" },
        }}
        title={`Event Meeting ${meetings?.data?.eventMeeting || ''}`}
        showPagination={
          !!(
            meetings?.data?.meetings?.length &&
            !isLoading &&
            (meetings.meta?.totalData as number) >
              (meetings?.meta?.perPage as number)
          )
        }
        searchField
        searchPlaceholder='Search Acara'
        pagination={pagination}
      >
        <Table>
          <TableHead field={["Name", "Description", 'Time', "Action"]} />
          <TableBody>
            {isLoading ? (
              <SimpleLoadingTable ColSpan={3} />
            ) : !meetings?.data?.meetings?.length ? (
              <tr>
                <td colSpan={6}>
                  <EmptyData title='Event Meeting' action />
                </td>
              </tr>
            ) : (
              meetings?.data.meetings.map((item, index) => (
                <TableItem
                  linkDetail={`/admin/event-meeting/${item.id}`}
                  linkUpdate={`/admin/event-meeting/edit/${item.id}`}
                  key={index}
                  show={index !== (meetings?.data?.meetings?.length as number) - 1}
                  {...item}
                  handleDelete={() => console.log("et")}
                />
              ))
            )}
          </TableBody>
        </Table>
      </PageLayout>
    </>
  );
};
