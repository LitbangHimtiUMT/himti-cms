import EmptyData from "@features/_global/components/EmptyData";
import { PageLayout } from "@features/_global/components/PageLayout";
import { SimpleLoadingTable } from "@features/_global/components/SimpleLoadingTable";
import {
  Table,
  TableBody,
  TableHead,
} from "@features/_global/components/Table";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAttendance } from "../hooks/useAttendance";
import { TableItem } from "./Table/TableItem";
import { useMeetingById } from "@features/event-meeting/hooks/useMeeting";

const AttendanceContent: React.FC = () => {
  const { data: attendances, isLoading: isLoadingAttend } = useAttendance();
  const { data: meeting, isLoading } = useMeetingById();

  const navigate = useNavigate();
  console.log(attendances)

  return (
    <PageLayout
      title={`Meeting ${meeting?.data?.name}`}
      action={{
        show: true,
        buttonTitle: "Back",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "white",
      }}
    >
      {isLoading && isLoadingAttend && (
        <table className="w-full justify-center items-center">
          <tbody>
            <SimpleLoadingTable />
          </tbody>
        </table>
      )}
      <Table>
        <TableHead field={["Image", "Name", "NIM", "Action"]} />
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
                image={item.image}
                user={item.user}
                location={item.location}
                point={item.point}
              />
            ))
          )}
        </TableBody>
      </Table>
      xx
    </PageLayout>
  );
};

export default AttendanceContent;
