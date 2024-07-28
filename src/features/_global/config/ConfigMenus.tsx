import { ItemMenuAdmin } from "../types/MenuTypes";
import { FaHome } from "react-icons/fa";

export const CONFIG_MENU_ADMIN: ItemMenuAdmin[] = [
  {
    icon: <FaHome />,
    name: "dashboard",
    to: "/home",
  },
];
