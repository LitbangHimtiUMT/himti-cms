import { openSidenavAtom } from "@features/admin/store/sidenav";
import { useProfile } from "@features/auth/hooks/useProfile";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, To } from "react-router-dom";

const AdminNavbar: React.FC<{
  page?: string;
  layout?: string;
  link?: string;
  showBackButton?: boolean;
}> = ({ link, showBackButton = true }) => {
  const [openSidenav, setOpenSidenav] = useAtom(openSidenavAtom);
  const { data: profile } = useProfile();

  // Hitung sapaan waktu dinamis
  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", icon: "🌅" };
    if (hour < 17) return { text: "Good afternoon", icon: "☀️" };
    return { text: "Good evening", icon: "🌙" };
  }, []);

  // Format tanggal penanda sistem
  const currentDateString = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, []);

  const adminName = profile?.data?.name || "Admin";

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between bg-gradient-to-b from-slate-50/90 via-slate-50/70 to-transparent px-4 py-4 backdrop-blur-md transition-all sm:px-6 md:py-5">
      
      {/* LEFT SECTION: Action Back OR Dynamic Greeting (Desktop: Dark Text | Mobile: White Responsive Adaption if needed) */}
      <div className="flex items-center min-w-0 max-w-[70%] sm:max-w-[80%]">
        {showBackButton && link ? (
          <Link to={link || (-1 as To)}>
            <button
              className="group flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm active:scale-95"
            >
              <IoChevronBackOutline className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span className="text-xs font-bold tracking-wide">Back</span>
            </button>
          </Link>
        ) : (
          <div className="flex flex-col min-w-0 md:pl-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 md:text-xs">
                {timeGreeting.text}
              </span>
              <span className="text-xs select-none">{timeGreeting.icon}</span>
            </div>
            <h1 className="text-sm font-extrabold text-slate-800 tracking-tight sm:text-base md:text-lg truncate mt-0.5">
              {adminName}
            </h1>
          </div>
        )}
      </div>

      {/* RIGHT SECTION: Interactive Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Desktop Premium Widget: Menggunakan warna gelap elegan senada teks sapaan */}
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm shadow-slate-100/50 xl:flex">
          <IoMdTime className="text-slate-400 h-4 w-4" />
          <span className="text-xs font-bold text-slate-700 tracking-wide">
            {currentDateString}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
        </div>

        {/* Mobile Hamburger Trigger (Menggunakan warna kontras tinggi) */}
        <button
          onClick={() => setOpenSidenav(!openSidenav)}
          className="p-2 rounded-xl text-slate-800 border border-slate-200/60 bg-white shadow-sm hover:bg-slate-50 active:scale-95 transition-all xl:hidden"
          aria-label="Toggle Navigation"
        >
          <RxHamburgerMenu className="h-5 w-5" />
        </button>
      </div>

    </nav>
  );
};

export default AdminNavbar;