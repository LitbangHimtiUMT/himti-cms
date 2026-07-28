import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { potentialUserKeysService } from "@core/services/potentialUserKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PotentialUserKeyDTO } from "../model/potentialUserKey";

export function usePotentialUserKeys() {
  const query = useQuery({
    queryKey: ["potentialUserKeys"],
    queryFn: () => potentialUserKeysService.get(),
  });
  return query;
}

interface KeyCreation {
  type: "create" | "delete";
  data?: PotentialUserKeyDTO;
  id?: string;
}

export function usePotentialUserKeyCreation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: KeyCreation) => {
      switch (type) {
        case "create":
          return potentialUserKeysService.post(data);
        case "delete":
          return potentialUserKeysService.delete({ path: id });
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
      if (variables.type === "create") {
        navigate("/admin/potential-user-keys");
      }
      queryClient.invalidateQueries({ queryKey: ["potentialUserKeys"] });
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
