import { CONFIG_APP } from "@core/configs/app";
import { MenuAdminConfig } from "@features/_global/types/MenuTypes";
import { useProfile } from "@features/auth/hooks/useProfile";
import { Button, IconButton, Typography } from "@material-tailwind/react";
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
      className={`bg-gradient-to-br from-gray-800 to-gray-900 ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed flex flex-col inset-0 z-50 mt-14 mb-5 ml-4 max-h-screen w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="-mt-9 mx-3 shadow-lg relative hover:scale-[1.15] duration-200">
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 z-10 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={setOpenSidenav}
        >
          <IoMdClose className="h-5 w-5 text-black" />
        </IconButton>
        <Link to="/" className="block">
          <Button
            className="py-3 px-2 text-center active:opacity-100 focus:opacity-100 bg-white border border-gray-900 text-black"
            fullWidth
          >
            <Typography className="font-bold" variant="h5">
              {CONFIG_APP.APP_NAME}
            </Typography>
            <div className="flex items-center justify-center gap-2 px-4 capitalize">
              <ImProfile />
              <Typography color="inherit" variant="h6" className="font-bold ">
                Hi, {profile?.data?.name}
              </Typography>
            </div>
            {/* <Typography color="inherit" className="font-medium capitalize">
            {name}
          </Typography> */}
          </Button>
        </Link>
      </div>
      <div className="my-5 mx-8 overflow-y-auto h-full">
        <ul className="flex flex-col gap-1">
          {Menus.map(({ icon, name, to }, index) => (
            <ItemSidenav key={index} name={name} to={to} icon={icon} />
          ))}
          <li>
            <Button
              variant={"text"}
              color={"white"}
              className="flex items-center gap-4 px-4 capitalize"
              fullWidth
              onClick={() => {
                if (!window.confirm("Are you sure you want to logout?")) return;
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              <IoMdLogOut />
              <Typography color="inherit" className="font-medium capitalize">
                Logout
              </Typography>
            </Button>
          </li>
        </ul>
      </div>
      {/* <div className="px-5 h-full py-2 flex-flex-col justify-between"></div> */}
    </aside>
  );
};

export default Sidenav;
