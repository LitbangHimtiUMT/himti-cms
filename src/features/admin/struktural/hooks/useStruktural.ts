import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { strukturalService } from "@core/services/struktural";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isStrukturalSigner } from "../model/struktural";

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

// The submitted FormData carries the whole answer: jabatan and
// department say whether the row signs certificates, and
// signatureImage is a File when a new signature was uploaded, the
// stored URL when unchanged, or "" when the row has none.
const isSignerWithoutSignature = (data: FormData): boolean => {
  const jabatan = data.get("jabatan");
  const department = data.get("department");
  const signatureImage = data.get("signatureImage");
  const hasSignature =
    signatureImage instanceof File ||
    (typeof signatureImage === "string" && signatureImage.length > 0);
  return (
    !hasSignature &&
    isStrukturalSigner(
      typeof jabatan === "string" ? jabatan : "",
      typeof department === "string" ? department : null
    )
  );
};

export function useStrukturalCreation() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: StrukturalCreation) => {
      switch (type) {
        case "create":
          return strukturalService.post(data, {
            contentType: "form-data",

          });
        case "update":
          return strukturalService.put(data, {
            contentType: "form-data",
            path: id,

          });
        case "delete":
          return strukturalService.delete({
            path: id,

          });
        default:
          return strukturalService.post(data, {
            contentType: "form-data",

          });
      }
    },
    onSuccess: (res, variables) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      if (
        (variables.type === "create" || variables.type === "update") &&
        variables.data &&
        isSignerWithoutSignature(variables.data)
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
      navigate("/admin/struktural");

      queryClient.removeQueries({ queryKey: ["strukturals"] });
      queryClient.removeQueries({ queryKey: ["strukturalsById"] });
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

export function useStrukturalById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["strukturalsById", id],
    queryFn: () => strukturalService.getById({ path: id }),
    enabled: !!id,
  });
}
