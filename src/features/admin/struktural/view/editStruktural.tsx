import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormEditStruktural from "../components/FormEditStruktural";

const EditStrukturalView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Struktural" page="Edit Struktural" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormEditStruktural />
      </div>
    </>
  );
};

export default EditStrukturalView;
