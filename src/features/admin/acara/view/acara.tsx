import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { AcaraContent } from "../components/AcaraContent";

const AcaraView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Acara" page="List Acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <AcaraContent />
      </div>
    </>
  );
};

export default AcaraView;
