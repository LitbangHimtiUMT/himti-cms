import { useQuery } from "@tanstack/react-query";
import { QueryParams } from "../../../core/libs/api/types";
import { HistoryFlag, HistoryModule } from "../../../core/model/histories";
import { historiesService } from "../../../core/services/histories";

interface HistoryQuery extends QueryParams {
  module?: HistoryModule;
  flag?: HistoryFlag;
  actionId?: string;
  enabled?: boolean;
}

export const useHistories = (query: HistoryQuery) => {
  const { module, actionId, flag, enabled = true } = query;
  return useQuery({
    queryKey: [
      `histories-${module}-${flag}`,
      {
        module,
        actionId,
        flag,
      },
    ],
    queryFn: () => historiesService.get({ queryParams: query }),
    enabled,
  });
};
