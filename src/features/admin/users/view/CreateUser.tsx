import AdminNavbar from "@features/admin/components/AdminNavbar";
import { FormCreateUserAdmin } from "../components/FormCreateUser";

export const CreateUserView = () => {
  return (
    <>
      <AdminNavbar layout="User" page="Add User" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <FormCreateUserAdmin />
      </div>
    </>
  );
};
