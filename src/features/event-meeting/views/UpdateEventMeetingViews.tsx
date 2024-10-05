import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { FormUpdateEM } from "../components/FormUpdateEM";

export const UpdateEventMeetingViews: React.FC = () => {
  return (
    <>
      <AdminNavbar
        layout="Event Meeting"
        page="Update Event Meeting"
        link="/admin/event-meeting"
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormUpdateEM />
      </div>
    </>
  );
};
