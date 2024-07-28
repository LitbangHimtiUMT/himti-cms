import AdminNavbar from "@features/_global/components/admin/AdminNavbar";
import React from "react";
import { ListUser } from "../components/ListUser";

export const UserView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="acara" page="list acara" />
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <ListUser />
      </div>
    </>
  );
};
