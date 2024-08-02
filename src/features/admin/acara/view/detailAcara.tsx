import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import DetailAcaraContent from "../components/DetailAcaraContent";

const DetailAcaraView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Acara" page="Detail Acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <DetailAcaraContent />
      </div>
    </>
  );
};

export default DetailAcaraView;
