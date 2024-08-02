import React from "react";
import AdminNavbar from "@features/admin/components/AdminNavbar";
import FormAddUser from "../components/FormAddUser";

const AddUserView: React.FC = () => {
  return (
    <>
      <AdminNavbar layout="User" page="Add User" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormAddUser />
      </div>
    </>
  );
};

export default AddUserView;
