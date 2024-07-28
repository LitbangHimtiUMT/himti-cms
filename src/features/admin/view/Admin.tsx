import Footer from "@features/_global/components/admin/Footer";
import Sidenav from "@features/_global/components/admin/Sidenav";
import { CONFIG_MENU_ADMIN } from "@features/_global/config";
import { useAuth } from "@features/auth/hooks/useAuth";
import React, { useState } from "react";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";


const AdminView: React.FC = ({  }) => {
  const [openSidenav, setOpenSidenav] = useState(true);
  const auth = useAuth();

  if (!auth?.token) {
    return <Navigate to={"/admin/login"} replace />;
  }

  const handleOpenSidenav = () => setOpenSidenav(!openSidenav);
  
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        openSidenav={openSidenav}
        setOpenSidenav={handleOpenSidenav}
        Menus={CONFIG_MENU_ADMIN}
      />
      <div className="p-4 xl:ml-80">
        <Outlet />
        <ScrollRestoration />
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminView;
