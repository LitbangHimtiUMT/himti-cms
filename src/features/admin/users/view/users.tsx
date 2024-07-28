import AdminNavbar from "@features/admin/components/AdminNavbar";
import React from "react";
import { ListUser } from "../components/ListUser";

export const UserView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="user" page="list User" />
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <ListUser />
      </div>
    </>
  );
};
