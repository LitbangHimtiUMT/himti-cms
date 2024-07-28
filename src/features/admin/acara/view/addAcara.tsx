import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormAddAcara from "../components/FormAddAcara";

const AddAcaraView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Acara" page="Tambah Acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <FormAddAcara />
      </div>
    </>
  );
};

export default AddAcaraView;
