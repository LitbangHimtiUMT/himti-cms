import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { subAcaraService } from "@core/services/subAcara";
import { toast } from "react-toastify";

type PayloadType = "create" | "update" | "delete";

interface SubAcaraCreation {
  type: PayloadType;
  data?: FormData;
  id?: string;
}

export function useSubAcaraList(eventId: string) {
  return useQuery({
    queryKey: ["subAcaraList", eventId],
    queryFn: () =>
      subAcaraService.get({
        params: {
          eventId,
          perPage: 100,
        },
      }),
    enabled: !!eventId,
  });
}

export function useSubAcaraCreation() {
  // const auth = useAuth();
  const queryClient = useQueryClient();
  const params = useParams();
  const acaraId = params.acaraId ?? params.id;

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
      queryClient.removeQueries({ queryKey: ["subAcaraList"] });
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
