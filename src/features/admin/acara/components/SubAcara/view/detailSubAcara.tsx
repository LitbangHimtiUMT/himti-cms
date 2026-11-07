import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import DetailSubAcaraContent from "../components/DetailSubAcaraContent";

const DetailSubAcaraView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Sub Acara" page="Detail Sub Acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <DetailSubAcaraContent />
      </div>
    </>
  );
};

export default DetailSubAcaraView;
