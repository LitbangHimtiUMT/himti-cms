import { HistoryFlag, HistoryModule } from "../../../core/model/histories";
import { BadgeVariant } from "../../_global/components/Badges";

export const textFlag: Record<HistoryFlag, { class: string; color: string }> = {
  CREATE: {
    class: "text-yellow-400",
    color: "#FBBF24",
  },
  UPDATE: {
    class: "text-green-400",
    color: "#34D399",
  },
  DELETE: {
    class: "text-red-400",
    color: "#F87171",
  },
  LOGIN: {
    class: "text-blue-400",
    color: "#60A5FA",
  },
  LOGOUT: {
    class: "text-red-400",
    color: "#F87171",
  },
};

export const FlagMappingVariant: Record<HistoryFlag, BadgeVariant> = {
  CREATE: "warning",
  DELETE: "danger",
  LOGIN: "primary",
  LOGOUT: "danger",
  UPDATE: "success",
};

export type FlagType = "Create" | "Update" | "Delete" | "Login" | "Logout";
export type ModuleType =
  | "Auth"
  | "Event"
  | "Meeting"
  | "Event Meeting"
  | "Member"
  | "User";

export const FlagMapping: Record<HistoryFlag, FlagType> = {
  CREATE: "Create",
  DELETE: "Delete",
  LOGIN: "Login",
  LOGOUT: "Logout",
  UPDATE: "Update",
};

export const ModuleMapping: Record<HistoryModule, ModuleType> = {
  EVENT: "Event",
  EVENT_MEETING: "Event Meeting",
  MEETING: "Meeting",
  MEMBER: "Member",
  AUTH: "Auth",
  USER: "User",
};
