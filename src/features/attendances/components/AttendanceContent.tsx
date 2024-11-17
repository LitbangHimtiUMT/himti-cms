import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import { useMeetingById } from "@features/event-meeting/hooks/useMeeting";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../_global/helper";
import { formatTime } from "../../_global/lib/FormatTime";
import { useAttendance } from "../hooks/useAttendance";
import { TableItem } from "./Table/TableItem";

const AttendanceContent: React.FC = () => {
  const { data: attendances, isLoading: isLoadingAttend } = useAttendance();
  const { data: meeting, isLoading } = useMeetingById();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const navigate = useNavigate();

  const onPageChange = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };
  const pagination = {
    currentPage: attendances?.meta?.page || 1,
    totalPages: attendances?.meta?.totalPages || 1,
    onPageChange,
  };

  return (
    <PageLayout
      title={`Meeting ${meeting?.data?.name}`}
      action={{
        show: true,
        buttonTitle: "Back",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "white",
      }}
      showPagination={
        !!(
          attendances?.data?.length &&
          !isLoadingAttend &&
          (attendances.meta?.totalData as number) >
            (attendances?.meta?.perPage as number)
        )
      }
      pagination={pagination}
    >
      {isLoading || isLoadingAttend ? (
        <table className="w-full justify-center items-center">
          <tbody>
            <SimpleLoadingTable />
          </tbody>
        </table>
      ) : (
        <Table>
          <TableHead
            field={["Image", "Name", "NIM", "Location", "Time", "Point"]}
          />
          <TableBody>
            {!attendances?.data?.length ? (
              <tr>
                <td colSpan={6}>
                  <EmptyData title="Absensi" action />
                </td>
              </tr>
            ) : (
              attendances?.data?.map((item, index) => (
                <TableItem
                  key={index}
                  show={index !== (attendances?.data?.length as number) - 1}
                  id={item.id}
                  time={formatTime(item.createdAt)}
                  image={item.image}
                  user={item.user}
                  location={item.location}
                  point={item.point}
                />
              ))
            )}
          </TableBody>
        </Table>
      )}
    </PageLayout>
  );
};

export default AttendanceContent;
