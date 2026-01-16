import { CONFIG_APP } from "@core/configs/app";
import { MenuAdminConfig } from "@features/_global/types/MenuTypes";
import { useProfile } from "@features/auth/hooks/useProfile";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { ImProfile } from "react-icons/im";
import { IoMdClose, IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import ItemSidenav from "./item";

const Sidenav: React.FC<{
  Menus: MenuAdminConfig;
  openSidenav: boolean;
  setOpenSidenav: () => void;
}> = ({ Menus, openSidenav, setOpenSidenav }) => {
  const { data: profile } = useProfile();

  return (
    <aside
      className={`bg-gradient-sidebar backdrop-blur-sm ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed flex flex-col top-4 bottom-5 left-4 z-50 w-72 rounded-2xl transition-all duration-300 xl:translate-x-0 border border-white/10 shadow-soft-xl`}
    >
      {/* Close Button - Mobile Only */}
      <div className="absolute right-3 top-3 xl:hidden z-20">
        <button
          onClick={setOpenSidenav}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 group"
        >
          <IoMdClose className="h-5 w-5 text-white group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="mt-5 mx-4 mb-6">
        <Link to="/" className="block group">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
            <Typography className="font-bold text-gray-800 text-center mb-3" variant="h5">
              {CONFIG_APP.APP_NAME}
            </Typography>
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-200">
              <div className="p-2 bg-primary-50 rounded-lg">
                <ImProfile className="text-primary-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <Typography className="text-xs text-gray-500 font-medium">
                  Welcome back,
                </Typography>
                <Typography className="font-bold text-gray-800 text-sm truncate">
                  {profile?.data?.name || 'Admin'}
                </Typography>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <div className="flex-1 mx-4 overflow-y-auto pb-4 custom-scrollbar">
        <ul className="flex flex-col gap-1.5">
          {Menus.map(({ icon, name, to }, index) => (
            <ItemSidenav key={index} name={name} to={to} icon={icon} />
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mx-4 mb-5 mt-4 pt-4 border-t border-white/10">
        <button
          onClick={() => {
            if (!window.confirm("Are you sure you want to logout?")) return;
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-white rounded-xl hover:bg-white/10 transition-all duration-200 group"
        >
          <IoMdLogOut className="text-xl group-hover:scale-110 transition-transform duration-200" />
          <Typography className="font-medium text-white/90 group-hover:text-white">
            Logout
          </Typography>
        </button>
      </div>
    </aside>
  );
};

export default Sidenav;
