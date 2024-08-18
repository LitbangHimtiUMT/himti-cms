import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { useParams } from "react-router-dom";
import FormEditSubAcara from "../components/FormEditSubAcara";

const EditSubAcaraView: React.FC = () => {
  const { acaraId } = useParams();

  return (
    <>
      <AdminNavbar
        link={`/admin/acara/${acaraId}`}
        layout="Sub Acara"
        page="Edit Sub Acara"
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormEditSubAcara />
      </div>
    </>
  );
};

export default EditSubAcaraView;
