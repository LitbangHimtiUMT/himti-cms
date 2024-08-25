import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { subAcaraService } from "@core/services/subAcara";
import { toast } from "react-toastify";

interface Options {
  page?: number,
  perPage?: number,
  subAcaraId?: string
}

type PayloadType = "create" | "update" | "delete";

interface SubAcaraCreation {
  type: PayloadType;
  data?: FormData;
  id?: string;
}

export function useSubAcaraCreation() {
  // const auth = useAuth();
  const queryClient = useQueryClient();
  const { acaraId } = useParams();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: SubAcaraCreation) => {
      switch (type) {
        case "create":
          return subAcaraService.post(data, {
            contentType: "form-data",

          });
        case "update":
          return subAcaraService.put(data, {
            contentType: "form-data",
            path: id,

          });
        case "delete":
          return subAcaraService.delete({ path: id });
        default:
          return subAcaraService.post(data, {
            contentType: "form-data",

          });
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate(`/admin/acara/${acaraId}`);

      queryClient.removeQueries({ queryKey: ["acarasById"] });
      queryClient.removeQueries({ queryKey: ["absensis"] });
      queryClient.removeQueries({ queryKey: ["subacarasById"] });
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

export function useSubAcaraById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["subacarasById", id],
    queryFn: () => subAcaraService.getById({ path: id }),
    enabled: !!id,
  });
}

// export function useAbsensi(options?: Options) {
export function useAbsensi(option?: Options) {
  const { id } = useParams();
  const [searchParams] = useSearchParams()
  const page = option?.page || searchParams.get("page") || 1;
  const perPage = option?.perPage || searchParams.get("perPage") || 10;
  const query = useQuery({
    queryKey: ["absensies", { id, page, perPage }],
    queryFn: () =>
      subAcaraService.getAbsensi({
        path: `sub-acara/${id}`,
        queryParams: {
          page: page ? Number(page) : undefined,
          perPage: perPage ? Number(perPage) : undefined,
        }
      }),
    enabled: !!id,
  });
  return query;
}
