import AdminNavbar from "@features/admin/components/AdminNavbar";
import { useParams } from "react-router-dom";
import AttendanceContent from "../components/AttendanceContent";

export const AttendanceViews = () => {
  const { eventMeetingId } = useParams();
  return (
    <>
      <AdminNavbar
        layout="Attendances"
        page="List Attendance"
        link={`/admin/event-meeting/${eventMeetingId}`}
        showBackButton={false}
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <AttendanceContent />
      </div>
    </>
  );
};
