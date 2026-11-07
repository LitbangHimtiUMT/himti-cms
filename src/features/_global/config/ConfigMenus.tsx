import { BiCategory, BiKey } from "react-icons/bi";
import { BsCalendar2EventFill } from "react-icons/bs";
import { FaCalendar, FaChalkboardTeacher, FaHistory, FaUser, FaGraduationCap, FaCalendarAlt, FaAddressBook } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { ItemMenuAdmin } from "../types/MenuTypes";
import { MdClass } from "react-icons/md";

export const CONFIG_MENU_ADMIN: ItemMenuAdmin[] = [
  {
    icon: <FaHistory />,
    name: "Log History",
    to: "/",
  },
  {
    icon: <FaUser />,
    name: "User",
    to: "/admin/user",
  },
  {
    icon: <FaCalendar />,
    name: "Acara",
    to: "/admin/acara",
  },
  {
    icon: <BsCalendar2EventFill />,
    name: "Event Meeting",
    to: "/admin/event-meeting",
  },
  {
    icon: <HiClipboardDocumentList size={16} />,
    name: "Registration",
    to: "/admin/registration-type",
  },
  {
    icon: <HiClipboardDocumentList size={16} />,
    name: "Event Registration",
    to: "/admin/event-registration",
  },
  {
    icon: <FaUserGroup />,
    name: "Angkatan",
    to: "/admin/angkatan",
  },
  {
    icon: <FaUserGroup />,
    name: "Anggota",
    to: "/admin/anggota",
  },
  {
    icon: <FaUserGroup size={12} />,
    name: "Struktural",
    to: "/admin/struktural",
  },
  {
    icon: <GiTeacher size={12} />,
    name: "Dosen",
    to: "/admin/dosen",
  },
  {
    icon: <BiKey size={16} />,
    name: "User Login",
    to: "/admin/user-login",
  },
  {
    icon: <MdClass size={16} />,
    name: "Classess",
    to: "/lms/class",
  },
  {
    icon: <BiCategory size={16} />,
    name: "Categories",
    to: "/lms/categories",
  },
  {
    icon: <FaChalkboardTeacher size={16} />,
    name: "Mentors",
    to: "/lms/mentors",
  },
  {
    icon: <IoMdInformationCircleOutline size={16} />,
    name: "Version",
    to: "/admin/version",
  },
  {
    icon: <BiKey size={16} />,
    name: "Potential Keys",
    to: "/admin/potential-user-keys",
  },
  {
    icon: <FaGraduationCap size={16} />,
    name: "Prodi Structural",
    to: "/admin/prodi-structural",
  },
  {
    icon: <FaCalendarAlt size={16} />,
    name: "Tenure Period",
    to: "/admin/periode",
  },
  {
    icon: <FaAddressBook size={16} />,
    name: "Contact Info",
    to: "/admin/contact-info",
  },
];
