import { EventType } from "../model/acara";

export type EventTypeMapping = "Common" | "Registration";

export const EventTypeMap: Record<EventType, EventTypeMapping> = {
  COMMON: "Common",
  REGISTRATION: "Registration",
};
