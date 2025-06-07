import { useSearchParams } from "react-router-dom";
import { QueryParams } from "../../../core/libs/api/types";
import useDebounce from "../../_global/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { classService } from "../../../core/services/classess";

interface Options extends QueryParams {
  page?: number;
  perPage?: number;
  name?: string;
  path?: string;
  ignoreUser?: string
}
export function useClasses(options?: Options) {
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery =
    options?.search || searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: ["classes", { page, perPage, search, path: options?.path, ignoreUser: options?.ignoreUser }],
    queryFn: () =>
      classService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          search,
          ...(options?.ignoreUser && {
            ignoreUser: options?.ignoreUser
          })
        },
        path: options?.path,
      }),
  });
  return query;
}
