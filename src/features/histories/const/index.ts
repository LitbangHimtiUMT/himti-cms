import { HistoryFlag } from "../../../core/model/histories";

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
