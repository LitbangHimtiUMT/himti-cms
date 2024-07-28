import { MenuAdminConfig } from "@features/_global/types/MenuTypes";
import { Button, IconButton } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const Sidenav: React.FC<{
  Menus: MenuAdminConfig;
  openSidenav: boolean;
  setOpenSidenav: () => void;
}> = ({ Menus, openSidenav, setOpenSidenav }) => {
  return (
    <aside
      className={`bg-gradient-to-br from-gray-800 to-gray-900 ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography variant="h6" color={"white"}>
            HIMTI_APP
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={setOpenSidenav}
        >
          <IoMdClose className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {Menus.map(({ icon, name, to }) => (
            <li key={name}>
              <NavLink to={to}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={isActive ? "black" : "white"}
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidenav;
