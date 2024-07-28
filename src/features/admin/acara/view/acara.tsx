import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import ListAcara from "../components/Table/ListAcara";

const AcaraView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Acara" page="List Acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <ListAcara />
      </div>
    </>
  );
};

export default AcaraView;
