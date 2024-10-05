import AdminNavbar from "@features/admin/components/AdminNavbar";
import { UserLoginContent } from "../components/UserLoginContent";

export const UserLoginView = () => {
  return (
    <>
      <AdminNavbar layout="user-login" page="List User Login" showBackButton={false} />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <UserLoginContent />
      </div>
    </>
  );
};
