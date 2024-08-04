import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { FormUpdateAngkatan } from "../components/FormUpdateAngkatan";

export const UpdateAngkatanView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Angkatan" page="Update Angkatan" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormUpdateAngkatan />
      </div>
    </>
  );
};
