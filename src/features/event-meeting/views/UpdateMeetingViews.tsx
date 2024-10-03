import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { FormUpdateMeeting } from "../components/meetings/FormUpdateMeeting";

export const UpdateMeetingViews: React.FC = () => {
  return (
    <>
      <AdminNavbar
        layout="Meeting"
        page="Update Meeting"
        link="/admin/event-meeting"
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormUpdateMeeting />
      </div>
    </>
  );
};
