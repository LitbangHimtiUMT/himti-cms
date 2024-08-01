import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { UserDTO } from "@core/model/user";
import { userService } from "@core/services/user";
import useDebounce from "@features/_global/hooks/useDebounce";
import { useAuth } from "@features/auth/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

interface Options {
  page?: number;
  perPage?: number;
}

type PayloadType = "create" | "update" | "delete";

interface UserCreation {
  type: PayloadType;
  data?: UserDTO;
  id?: string;
}

export const useUser = (options?: Options) => {
    const [searchParams] = useSearchParams();
    const page = options?.page || searchParams.get("page") || 1;
    const perPage = options?.perPage || searchParams.get("perPage") || 10;
    const searchQuery = searchParams.get("search") || undefined;
  
    const search = useDebounce(searchQuery as string, 500);
    const query = useQuery({
      queryKey: ["users", { page, perPage, search }],
      queryFn: () =>
        userService.get({
          queryParams: {
            perPage: perPage ? Number(perPage) : undefined,
            page: page ? Number(page) : undefined,
            search
          },
        }),
    });
  return query;
};

export function useUserCreation() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: UserCreation) => {
      switch (type) {
        case "create":
          return userService.post(data, { bearerToken: auth?.token });
        case "update":
          return userService.put(data, { path: id, bearerToken: auth?.token });
        case "delete":
          return userService.delete({ path: id, bearerToken: auth?.token });
        default:
          return userService.post(data, { bearerToken: auth?.token });
      }
    },
    onSuccess: (res) => {
      console.log(res);
      navigate("/admin/user");

      queryClient.removeQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["usersById"] });
      return;
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      console.log(err);
    },
  });
  return mutation;
}

export function useUserById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["usersById", id],
    queryFn: () => userService.getById({ path: id }),
    enabled: !!id,
  });
}
