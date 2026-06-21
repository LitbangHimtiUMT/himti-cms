import { CONFIG_APP } from "@core/configs/app";
import { MenuAdminConfig } from "@features/_global/types/MenuTypes";
import { useProfile } from "@features/auth/hooks/useProfile";
import React, { useMemo } from "react";
import { IoMdClose, IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import ItemSidenav from "./item";
import HIMTI from "@core/assets/Logo/HIMTI.png";

const Sidenav: React.FC<{
  Menus: MenuAdminConfig;
  openSidenav: boolean;
  setOpenSidenav: () => void;
}> = ({ Menus, openSidenav, setOpenSidenav }) => {
  const { data: profile } = useProfile();

  const groupedMenus = useMemo(() => {
    const groups = {
      core: { label: "Core Management", items: [] as MenuAdminConfig },
      organization: { label: "Organization", items: [] as MenuAdminConfig },
      lms: { label: "Learning Space", items: [] as MenuAdminConfig },
      system: { label: "System Config", items: [] as MenuAdminConfig },
    };

    Menus.forEach((menu) => {
      if (menu.to.startsWith("/lms")) groups.lms.items.push(menu);
      else if (["Angkatan", "Anggota", "Struktural", "Dosen"].includes(menu.name)) groups.organization.items.push(menu);
      else if (["Log History", "Version", "User Login"].includes(menu.name) || menu.to === "/") groups.system.items.push(menu);
      else groups.core.items.push(menu);
    });

    return Object.values(groups).filter((g) => g.items.length > 0);
  }, [Menus]);

  return (
    <>
      {/* Mobile Dark Dim Overlay */}
      {openSidenav && (
        <div 
          onClick={setOpenSidenav}
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 xl:hidden"
        />
      )}

      <aside
        style={{ backgroundColor: "#ffffffc7" }}
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 flex flex-col p-5 font-sans transition-transform duration-300 ease-in-out shadow-2xl border-r border-slate-800
          xl:top-4 xl:bottom-4 xl:left-4 xl:rounded-3xl xl:border xl:border-slate-800
          ${openSidenav ? "translate-x-0" : "-translate-x-80"} xl:translate-x-0
        `}
      >
        {/* HEADER SECTION: Logo & Brand */}
        <div className="relative mb-5 flex flex-col gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <Link to="/admin/acara" className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-1.5 shadow-md shadow-black/20 group-hover:scale-105 transition-transform border border-slate-800">
                <img src={HIMTI} alt="Logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block font-extrabold text-slate-800 tracking-wide text-sm leading-none">
                  {CONFIG_APP.APP_NAME}
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mt-1.5">
                  Workspace
                </p>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={setOpenSidenav}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors xl:hidden"
            >
              <IoMdClose className="h-4 w-4" />
            </button>
          </div>

          {/* USER PROFILE
          <div className="flex items-center gap-3 pt-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#4C76A3] to-[#203D5D] text-white font-bold text-xs shadow-inner shrink-0">
              {(profile?.data?.name || "A").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-bold text-slate-800 text-xs truncate leading-tight">
                {profile?.data?.name || "Administrator"}
              </span>
              <p className="text-[9px] text-slate-500 font-medium mt-0.5">HIMTI Internal Admin</p>
            </div>
          </div> */}
        </div>

        {/* CATEGORIZED MENU SYSTEM */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 custom-scrollbar">
          {groupedMenus.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
                {group.label}
              </span>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((menu, mIdx) => (
                  <ItemSidenav 
                    key={mIdx} 
                    name={menu.name} 
                    to={menu.to} 
                    icon={menu.icon} 
                    onClick={window.innerWidth < 1280 ? setOpenSidenav : undefined}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FOOTER SYSTEM ACTION */}
        <div className="mt-auto pt-3 border-t border-slate-800">
          <button
            onClick={() => {
              if (!window.confirm("Are you sure you want to logout?")) return;
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
          >
            <IoMdLogOut className="text-base group-hover:translate-x-0.5 transition-transform" />
            <span className="font-semibold text-xs">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidenav;