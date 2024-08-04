import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import FormEditDosen from "../components/FormEditAngkatan";

const EditDosenView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Dosen" page="Edit Dosen" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormEditDosen />
      </div>
    </>
  );
};

export default EditDosenView;
