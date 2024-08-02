import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormAddStruktural from "../components/FormAddStruktural";

const AddStrukturalView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Struktural" page="Add Struktural" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormAddStruktural />
      </div>
    </>
  );
};

export default AddStrukturalView;
