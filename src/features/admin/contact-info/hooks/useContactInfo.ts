import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { contactInfoService } from "@core/services/contactInfo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ContactInfoDTO, ContactInfoModel } from "../model/contactInfo";

interface ContactInfoCreation {
  type: "create" | "update" | "delete" | "batch";
  data?: ContactInfoDTO;
  batchData?: ContactInfoModel[];
  id?: string;
}

export function useContactInfo() {
  const query = useQuery({
    queryKey: ["contactInfos"],
    queryFn: () => contactInfoService.get(),
  });
  return query;
}

export function useContactInfoById() {
  const { id } = useParams();
  const query = useQuery({
    queryKey: ["contactInfosById", id],
    queryFn: () => contactInfoService.getById({ path: id }),
    enabled: !!id,
  });
  return query;
}

export function useContactInfoCreation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, batchData, type, id }: ContactInfoCreation) => {
      switch (type) {
        case "create":
          return contactInfoService.post(data);
        case "update":
          return contactInfoService.put(data, { path: id });
        case "delete":
          return contactInfoService.delete({ path: id });
        case "batch":
          if (!batchData) throw new Error("Batch data is required");
          return contactInfoService.batchPut(batchData);
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
        navigate("/admin/contact-info");
      }
      queryClient.invalidateQueries({ queryKey: ["contactInfos"] });
      queryClient.invalidateQueries({ queryKey: ["contactInfosById"] });
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
