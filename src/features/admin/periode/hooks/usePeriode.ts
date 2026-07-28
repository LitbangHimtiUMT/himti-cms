import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { periodeService } from "@core/services/periode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface PeriodeCreation {
  type: "create" | "update" | "delete";
  data?: FormData;
  id?: string;
}

export function usePeriode() {
  const query = useQuery({
    queryKey: ["periodes"],
    queryFn: () => periodeService.get(),
  });
  return query;
}

export function usePeriodeById() {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ["periodesById", id],
    queryFn: () => periodeService.getById({ path: id }),
    enabled: !!id,
  });
  return query;
}

export function usePeriodeCreation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: PeriodeCreation) => {
      switch (type) {
        case "create":
          return periodeService.post(data, {
            contentType: "form-data",
          });
        case "update":
          return periodeService.put(data, {
            contentType: "form-data",
            path: id,
          });
        case "delete":
          return periodeService.delete({
            path: id,
          });
        default:
          throw new Error("Invalid action type");
      }
    },
    onSuccess: (res, variables) => {
      toast.success(res.message || "Action success", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      if (variables.type === "create" || variables.type === "update") {
        navigate("/admin/periode");
      }
      queryClient.invalidateQueries({ queryKey: ["periodes"] });
      queryClient.invalidateQueries({ queryKey: ["periodesById"] });
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      toast.error(err?.message || "Action failed", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
}
