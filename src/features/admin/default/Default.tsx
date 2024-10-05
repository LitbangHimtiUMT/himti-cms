import { CONFIG_MENU_ADMIN } from "@features/_global/config";
import Sidenav from "../components/Sidenav";

export const DefaultView = () => {
  return (
    <div className="sm:hidden w-screen ">
      <Sidenav
        openSidenav={true}
        setOpenSidenav={() => {}}
        Menus={CONFIG_MENU_ADMIN}
      />
    </div>
  );
};
