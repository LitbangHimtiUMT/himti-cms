import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormAddSubAcara from "../components/FormAddSubAcara";

const AddSubAcaraView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Sub Acara" page="Add Sub Acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormAddSubAcara />
      </div>
    </>
  );
};

export default AddSubAcaraView;
