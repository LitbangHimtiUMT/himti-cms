import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { FormCreateRegistrationType } from "../components/FormCreateRegistrationType";

export const CreateRegistrationTypeView: React.FC = () => {
  return (
    <>
      <AdminNavbar
        layout="Registration Type"
        page="Create Registration Type"
        link="/admin/registration-type"
        showBackButton={true}
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormCreateRegistrationType />
      </div>
    </>
  );
};
