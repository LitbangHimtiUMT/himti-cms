import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { FormUpdateRegistrationType } from "../components/FormUpdateRegistrationType";

export const UpdateRegistrationTypeView: React.FC = () => {
  return (
    <>
      <AdminNavbar
        layout="Registration Type"
        page="Update Registration Type"
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormUpdateRegistrationType />
      </div>
    </>
  );
};
