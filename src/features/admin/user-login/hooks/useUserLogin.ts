import { userLoginService } from "@core/services/user-login";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../../_global/hooks/useDebounce";

export function useUserLogin() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;
  const searchQuery = searchParams.get("search") || undefined;

  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: ["userLogin", { page, perPage, search }],
    queryFn: () =>
      userLoginService.get({
        queryParams: {
          page: page ? Number(page) : undefined,
          perPage: perPage ? Number(perPage) : undefined,
          search,
        },
      }),
  });

  return query;
}
