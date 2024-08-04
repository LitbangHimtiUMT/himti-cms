import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { FormCreateAngkatan } from "../components/FormCreateAngkatan";

export const CreateAngkatanView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Angkatan" page="Create Angkatan" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormCreateAngkatan />
      </div>
    </>
  );
};
