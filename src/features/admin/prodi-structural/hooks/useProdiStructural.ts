import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { prodiStructuralService } from "@core/services/prodiStructural";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ProdiStructuralCreation {
  type: "create" | "update" | "delete";
  data?: FormData;
  id?: string;
}

export function useProdiStructural() {
  const query = useQuery({
    queryKey: ["prodiStructural"],
    queryFn: () => prodiStructuralService.get(),
  });
  return query;
}

export function useProdiStructuralById() {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ["prodiStructuralById", id],
    queryFn: () => prodiStructuralService.getById({ path: id }),
    enabled: !!id,
  });
  return query;
}

export function useProdiStructuralCreation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: ProdiStructuralCreation) => {
      switch (type) {
        case "create":
          return prodiStructuralService.post(data, {
            contentType: "form-data",
          });
        case "update":
          return prodiStructuralService.put(data, {
            contentType: "form-data",
            path: id,
          });
        case "delete":
          return prodiStructuralService.delete({
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
        navigate("/admin/prodi-structural");
      }
      queryClient.invalidateQueries({ queryKey: ["prodiStructural"] });
      queryClient.invalidateQueries({ queryKey: ["prodiStructuralById"] });
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
