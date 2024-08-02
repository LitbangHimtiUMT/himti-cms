import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormAddDosen from "../components/FormAddDosen";

const AddDosenView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Dosen" page="Add Dosen" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormAddDosen />
      </div>
    </>
  );
};

export default AddDosenView;
