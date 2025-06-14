import { UserModel } from "./user";

export type HistoryModule =
  | "USER"
  | "EVENT"
  | "EVENT_MEETING"
  | "MEETING"
  | "MEMBER"
  | 'AUTH';
export type HistoryFlag = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | 'ERROR';

export enum HistoryModuleEnum {
  USER = "USER",
  EVENT = "EVENT",
  EVENT_MEETING = "EVENT_MEETING",
  MEETING = "MEETING",
  MEMBER = "MEMBER",
  USER_ACTION = "USER_ACTION",
}

export enum HistoryFlagEnum {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}
export interface HistoriesDTO {
  id: string;
  title: string;
  module: HistoryModule;
  flag: HistoryFlag;
  actionId: string | null;
  statusCode: string | null;
  createdAt: Date;
  user: UserModel | null;
}
