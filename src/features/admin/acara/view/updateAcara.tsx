import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormEditAcara from "../components/FormEditAcara";

const EditAcaraView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Acara" page="Edit Acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormEditAcara />
      </div>
    </>
  );
};

export default EditAcaraView;
