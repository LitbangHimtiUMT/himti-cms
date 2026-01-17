import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { AngkatanDTO } from "@core/model/angkatan";
import { angkatanService } from "@core/services/angkatan";
import useDebounce from "@features/_global/hooks/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Options {
  page?: number;
  perPage?: number;
  search?: string;
}

type PayloadType = "create" | "update" | "delete";

interface AngkatanCreation {
  type: PayloadType;
  data?: AngkatanDTO;
  id?: string;
}

export const useAngkatan = (options?: Options) => {
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery =
    options?.search || searchParams.get("search") || undefined;

  const search = useDebounce(searchQuery as string, 500);
  const query = useQuery({
    queryKey: ["angkatans", { page, perPage, search }],
    queryFn: () =>
      angkatanService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          search,
        },
      }),
  });
  return query;
};

export function useAngkatanCreation() {
  // const auth = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: AngkatanCreation) => {
      switch (type) {
        case "create":
          return angkatanService.post(data);
        case "update":
          return angkatanService.put(data, {
            path: id
          });
        case "delete":
          return angkatanService.delete({ path: id, });
        default:
          return angkatanService.post(data);
      }
    },
    onSuccess: (res) => {
      navigate("/admin/angkatan");
      toast.success(res.message)
      queryClient.removeQueries({ queryKey: ["angkatans"] });
      queryClient.removeQueries({ queryKey: ["angkatanById"] });
      return;
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      toast.error(err.message);
    },
  });
  return mutation;
}

export function useAngkatanById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["angkatanById", id],
    queryFn: () => angkatanService.getById({ path: id }),
    enabled: !!id,
  });
}

export const useAngkatanDropdown = () => {
  const query = useQuery({
    queryKey: ["angkatans-dropdown"],
    queryFn: () =>
      angkatanService.get({
        queryParams: {
          perPage: 50,
          page: 1,
        },
      }),
  });
  return query;
};
