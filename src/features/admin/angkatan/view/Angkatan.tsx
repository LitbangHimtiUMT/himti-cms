import AdminNavbar from "@features/admin/components/AdminNavbar";
import { AngkatanContent } from "../components/AngkatanContent";

export const AngkatanView = () => {
  return (
    <>
      <AdminNavbar layout="angkatan" page="List Angkatan" />
      <div className="mt-12 mb-8 flex flex-col gap-12 flex-1">
        <AngkatanContent />
      </div>
    </>
  );
};
