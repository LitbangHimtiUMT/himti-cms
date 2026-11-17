import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { prodiStructuralService } from "@core/services/prodiStructural";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isProdiStructuralSigner } from "../model/prodiStructural";

interface ProdiStructuralCreation {
  type: "create" | "update" | "delete";
  data?: FormData;
  id?: string;
  // The form only sends signatureImage when a new file is chosen, so
  // an update without a new file carries no trace of the stored
  // signature: the edit form passes this from the loaded detail.
  hasExistingSignature?: boolean;
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

// Only the Kaprodi row signs certificates. A signature counts when a
// new file was uploaded in this save, or one was already stored.
const isSignerWithoutSignature = (
  data: FormData | undefined,
  hasExistingSignature: boolean | undefined
): boolean => {
  if (!data) {
    return false;
  }
  const role = data.get("role");
  const signatureImage = data.get("signatureImage");
  return (
    isProdiStructuralSigner(typeof role === "string" ? role : "") &&
    !(signatureImage instanceof File) &&
    !hasExistingSignature
  );
};

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
      if (
        (variables.type === "create" || variables.type === "update") &&
        isSignerWithoutSignature(variables.data, variables.hasExistingSignature)
      ) {
        toast.warn(
          "TTD belum diupload — sertifikat akan terbit tanpa gambar tanda tangan.",
          {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            theme: "dark",
          }
        );
      }
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
