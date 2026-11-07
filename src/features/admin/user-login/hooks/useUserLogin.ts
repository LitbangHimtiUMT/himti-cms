import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { userLoginService } from "@core/services/user-login";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
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

export function useUserLoginDeletion() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => userLoginService.delete({ path: id }),
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        theme: "dark",
      });
      queryClient.invalidateQueries({ queryKey: ["userLogin"] });
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
}
