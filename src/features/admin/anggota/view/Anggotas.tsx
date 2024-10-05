import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { AnggotaContent } from "../components/AnggotaContent";

export const AnggotaView: React.FC = () => {
  return (
    <>
      <AdminNavbar
        layout="anggota"
        page="list Anggota"
        showBackButton={false}
      />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <AnggotaContent />
      </div>
    </>
  );
};
