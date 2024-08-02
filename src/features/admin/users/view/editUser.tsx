import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormEditUser from "../components/FormEditUser";

const EditUserView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="User" page="Edit User" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormEditUser />
      </div>
    </>
  );
};

export default EditUserView;
