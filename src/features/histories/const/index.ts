import { HistoryFlag, HistoryModule } from "../../../core/model/histories";
import { BadgeVariant } from "../../_global/components/Badges";

export const FlagMappingVariant: Record<HistoryFlag, BadgeVariant> = {
  CREATE: "warning",
  DELETE: "danger",
  LOGIN: "primary",
  LOGOUT: "danger",
  UPDATE: "success",
  ERROR: "danger",
};

export type FlagType =
  | "Create"
  | "Update"
  | "Delete"
  | "Login"
  | "Logout"
  | "Error";
export type ModuleType =
  | "Auth"
  | "Event"
  | "Meeting"
  | "Event Meeting"
  | "Member"
  | "User"
  | "Class"
  | "Lecturer"
  | "Mentor"
  | "System"
  | "Version";

export const FlagMapping: Record<HistoryFlag, FlagType> = {
  CREATE: "Create",
  DELETE: "Delete",
  LOGIN: "Login",
  LOGOUT: "Logout",
  UPDATE: "Update",
  ERROR: "Error",
};

export const ModuleMapping: Record<HistoryModule, ModuleType> = {
  EVENT: "Event",
  EVENT_MEETING: "Event Meeting",
  MEETING: "Meeting",
  MEMBER: "Member",
  AUTH: "Auth",
  USER: "User",
  CLASS: "Class",
  LECTURER: "Lecturer",
  MENTOR: "Mentor",
  SYSTEM: "System",
  VERSION: "Version",
};
