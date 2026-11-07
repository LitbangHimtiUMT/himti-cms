import HIMTILOADER from "@core/assets/loader/HIMTI.svg";
import { CONFIG_MENU_ADMIN } from "@features/_global/config";
import Footer from "@features/admin/components/Footer";
import { useAuth } from "@features/auth/hooks/useAuth";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidenav from "../components/Sidenav";
import { openSidenavAtom } from "../store/sidenav";

const AdminView: React.FC = () => {
  const [openSidenav, setOpenSidenav] = useAtom(openSidenavAtom);
  const auth = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1140) {
        setOpenSidenav(false);
      }
    };
    window.addEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const handleOpenSidenav = () => setOpenSidenav(!openSidenav);

  if (auth?.isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <img
          className="w-[350px] object-cover"
          src={HIMTILOADER}
          alt="Loading..."
        />
      </div>
    );
  }

  if (!auth?.data) {
    return <Navigate to={"/admin/login"} replace />;
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      {/* Backdrop Overlay for Mobile */}
      {openSidenav && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={handleOpenSidenav}
          aria-label="Close Sidebar"
        />
      )}

      <Sidenav
        openSidenav={openSidenav}
        setOpenSidenav={handleOpenSidenav}
        Menus={CONFIG_MENU_ADMIN}
      />
      <div className="p-4 min-h-screen flex flex-col xl:ml-80 justify-between">
        <Outlet />
        <ScrollRestoration />
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>

      {/* Floating Action Button - Mobile Sidebar Toggle */}
      {!openSidenav && (
        <button
          onClick={handleOpenSidenav}
          className="xl:hidden fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Open Sidebar Menu"
        >
          <RxHamburgerMenu className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default AdminView;
