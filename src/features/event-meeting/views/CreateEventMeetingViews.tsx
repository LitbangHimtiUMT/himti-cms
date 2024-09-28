import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { FormCreateEM } from "../components/FormCreateEM";


export const CreateEventMeetingViews: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Event Meeting" page="Create Event Meeting"  link="/admin/event-meeting"/>
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormCreateEM />
      </div>
    </>
  );
};
