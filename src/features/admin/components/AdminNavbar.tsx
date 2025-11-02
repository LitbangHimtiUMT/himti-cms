import { openSidenavAtom } from "@features/admin/store/sidenav";
import { useAtom } from "jotai";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, To } from "react-router-dom";

const AdminNavbar: React.FC<{
  page?: string;
  layout?: string;
  link?: string;
  showBackButton?: boolean;
}> = ({ link, showBackButton = true }) => {
  const [openSidenav, setOpenSidenav] = useAtom(openSidenavAtom);

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 transition-all">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left Section - Back Button */}
        <div className="flex-1">
          {showBackButton && link && (
            <Link to={link || (-1 as To)}>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg
                               text-gray-600 hover:text-primary-600 hover:bg-primary-50
                               transition-all duration-200 group">
                <IoChevronBackOutline
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
                />
                <span className="text-sm font-medium">Back</span>
              </button>
            </Link>
          )}
        </div>

        {/* Right Section - Hamburger Menu */}
        <div className="xl:hidden">
          <button
            onClick={() => setOpenSidenav(!openSidenav)}
            className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50
                     transition-all duration-200 group"
          >
            <RxHamburgerMenu className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
