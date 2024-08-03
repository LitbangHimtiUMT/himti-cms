import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormEditSubAcara from "../components/FormEditSubAcara";

const EditSubAcaraView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Sub Acara" page="Edit Sub Acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormEditSubAcara />
      </div>
    </>
  );
};

export default EditSubAcaraView;
