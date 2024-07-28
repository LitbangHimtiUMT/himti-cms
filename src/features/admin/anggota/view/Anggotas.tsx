import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { ListAnggota } from "../components/ListAnggota";

export const AnggotaView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="anggota" page="list Anggota" searchField />
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <ListAnggota />
      </div>
    </>
  );
};
