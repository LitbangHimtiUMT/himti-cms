import { FaCalendar, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { ItemMenuAdmin } from "../types/MenuTypes";

export const CONFIG_MENU_ADMIN: ItemMenuAdmin[] = [
  {
    icon: <FaUser />,
    name: "User",
    to: "/admin/user",
  },
  {
    icon: <FaUserGroup />,
    name: "Anggota",
    to: "/admin/anggota",
  },
  {
    icon: <FaCalendar />,
    name: "Acara",
    to: "/admin/acara",
  },
];
