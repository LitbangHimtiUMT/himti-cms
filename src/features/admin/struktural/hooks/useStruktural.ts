import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { strukturalService } from "@core/services/struktural";
import { useAuth } from "@features/auth/hooks/useAuth";
import { toast } from "react-toastify";

interface Options {
  page?: number;
  perPage?: number;
}

type PayloadType = "create" | "update" | "delete";

interface StrukturalCreation {
  type: PayloadType;
  data?: FormData;
  id?: string;
}

export function useStruktural(options?: Options) {
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const query = useQuery({
    queryKey: ["strukturals", { page, perPage }],
    queryFn: () =>
      strukturalService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
        },
      }),
  });
  return query;
}

export function useStrukturalCreation() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: StrukturalCreation) => {
      switch (type) {
        case "create":
          return strukturalService.post(data, {
            contentType: "form-data",
            bearerToken: auth?.token,
          });
        case "update":
          return strukturalService.put(data, {
            contentType: "form-data",
            path: id,
            bearerToken: auth?.token,
          });
        case "delete":
          return strukturalService.delete({
            path: id,
            bearerToken: auth?.token,
          });
        default:
          return strukturalService.post(data, {
            contentType: "form-data",
            bearerToken: auth?.token,
          });
      }
    },
    onSuccess: (res) => {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate("/admin/struktural");

      queryClient.removeQueries({ queryKey: ["strukturals"] });
      queryClient.removeQueries({ queryKey: ["strukturalsById"] });
      return;
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      toast.error(err.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
}

export function useStrukturalById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["strukturalsById", id],
    queryFn: () => strukturalService.getById({ path: id }),
    enabled: !!id,
  });
}
