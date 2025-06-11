import { useQuery } from "@tanstack/react-query";
import { QueryParams } from "../../../core/libs/api/types";
import { HistoryFlag, HistoryModule } from "../../../core/model/histories";
import { historiesService } from "../../../core/services/histories";
import { useSearchParams } from "react-router-dom";

interface HistoryQuery extends QueryParams {
  module?: HistoryModule;
  flag?: HistoryFlag;
  actionId?: string;
  enabled?: boolean;
}

export const useHistories = (query: HistoryQuery) => {
  const { actionId, enabled = true, page, perPage } = query;
  const [searchParams] = useSearchParams();
  const pageQuery = page || searchParams?.get("page");
  const perPageQuery = perPage || searchParams?.get("perPage");
  const module = query?.module || searchParams?.get("module");
  const flag = query?.flag || searchParams?.get("flag");
  return useQuery({
    queryKey: [
      `histories-${module}-${flag}`,
      {
        module,
        actionId,
        flag,
        pageQuery,
        perPageQuery,
      },
    ],
    queryFn: () =>
      historiesService.get({
        queryParams: {
          ...query,
          ...(module && { module }),
          ...(flag && { flag }),
          ...(pageQuery && { page: Number(pageQuery) }),
          ...(perPageQuery && { perPage: Number(perPageQuery) }),
        },
      }),
    enabled,
  });
};
