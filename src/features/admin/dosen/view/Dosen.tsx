import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { DosenContent } from "../components/DosenContent";

export const DosenView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="dosen" page="List Dosen" />
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <DosenContent />
      </div>
    </>
  );
};
