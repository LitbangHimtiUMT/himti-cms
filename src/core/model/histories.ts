import { UserModel } from "./user";

export type HistoryModule =
  | "USER"
  | "EVENT"
  | "EVENT_MEETING"
  | "MEETING"
  | "MEMBER"
  | "AUTH"
  | "VERSION"
  | "CLASS"
  | "MENTOR"
  | "LECTURER"
  | "SYSTEM";

export type HistoryFlag =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "LOGOUT"
  | "ERROR"
  | 'APPROVE'
  | 'REJECT'
  ;

export const HistoryModuleEnum: Record<HistoryModule, HistoryModule> = {
  USER: "USER",
  EVENT: "EVENT",
  EVENT_MEETING: "EVENT_MEETING",
  MEETING: "MEETING",
  MEMBER: "MEMBER",
  AUTH: "AUTH",
  VERSION: "VERSION",
  CLASS: "CLASS",
  MENTOR: "MENTOR",
  LECTURER: "LECTURER",
  SYSTEM: "SYSTEM",
};

export const HistoryFlagEnum: Record<HistoryFlag, HistoryFlag> = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  ERROR: "ERROR",
  APPROVE: 'APPROVE',
  REJECT: 'REJECT'
};
export interface HistoriesDTO {
  id: string;
  title: string;
  module: HistoryModule;
  flag: HistoryFlag;
  actionId: string | null;
  statusCode: string | null;
  endpoint: string | null;
  createdAt: Date;
  user: UserModel | null;
}
