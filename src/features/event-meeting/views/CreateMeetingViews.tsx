import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { FormCreateMeeting } from "../components/meetings/FormCreateMeeting";

export const CreateMeetingViews: React.FC = () => {
  return (
    <>
      <AdminNavbar
        layout="Event Meeting"
        page="Create Meeting"
        link="/admin/event-meeting"
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormCreateMeeting />
      </div>
    </>
  );
};
