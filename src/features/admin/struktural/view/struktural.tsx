import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { StrukturalContent } from "../components/StrukturalContent";

const StrukturalView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="Struktural" page="List Struktural" showBackButton={false} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <StrukturalContent />
      </div>
    </>
  );
};

export default StrukturalView;
