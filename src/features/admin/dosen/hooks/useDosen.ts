import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { DosenDTO } from "@core/model/dosen";
import { dosenService } from "@core/services/dosen";
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

interface DosenCreation {
  type: PayloadType;
  data?: DosenDTO;
  id?: string;
}

export const useDosen = (options?: Options) => {
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery =
    options?.search || searchParams.get("search") || undefined;

  const search = useDebounce(searchQuery as string, 500);
  const query = useQuery({
    queryKey: ["dosens", { page, perPage, search }],
    queryFn: () =>
      dosenService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          search,
        },
      }),
  });
  return query;
};

export function useDosenCreation() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: DosenCreation) => {
      switch (type) {
        case "create":
          return dosenService.post(data,);
        case "update":
          return dosenService.put(data, {
            path: id,

          });
        case "delete":
          return dosenService.delete({ path: id });
        default:
          return dosenService.post(data,);
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate("/admin/dosen");

      queryClient.removeQueries({ queryKey: ["dosens"] });
      queryClient.removeQueries({ queryKey: ["dosensById"] });
      return;
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

export function useDosenById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["dosensById", id],
    queryFn: () => dosenService.getById({ path: id }),
    enabled: !!id,
  });
}
