import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { AnggotaDTO } from "@core/model/anggota";
import { anggotaService } from "@core/services/anggota";
import useDebounce from "@features/_global/hooks/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Options {
  page?: number;
  perPage?: number;
  search?: string;
  generationId?: string;
}

type PayloadType = "create" | "update" | "delete";

interface AnggotaCreation {
  type: PayloadType;
  data?: AnggotaDTO;
  id?: string;
}

export const useAnggota = (options?: Options) => {
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery = options?.search || searchParams.get("search") || undefined;
  const generationId = options?.generationId;

  const search = useDebounce(searchQuery as string, 500);
  const query = useQuery({
    queryKey: ["anggotas", { page, perPage, search, generationId }],
    queryFn: () =>
      anggotaService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          search,
          generationId,
        },
      }),
  });
  return query;
};

export function useAnggotaCreation() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: AnggotaCreation) => {
      switch (type) {
        case "create":
          return anggotaService.post(data);
        case "update":
          return anggotaService.put(data, {
            path: id,

          });
        case "delete":
          return anggotaService.delete({ path: id });
        default:
          return anggotaService.post(data);
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate("/admin/anggota");

      queryClient.removeQueries({ queryKey: ["anggotas"] });
      queryClient.removeQueries({ queryKey: ["anggotasById"] });
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

export function useAnggotaById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["anggotasById", id],
    queryFn: () => anggotaService.getById({ path: id }),
    enabled: !!id,
  });
}

export function useExportAnggota() {
  const mutation = useMutation({
    mutationFn: async ({ generationId }: { generationId?: string }) => {
      const params = new URLSearchParams();
      if (generationId) {
        params.append("generationId", generationId);
      }

      const response = await fetch(
        `${import.meta.env.HIMTI_BASE_URL}/anggota/export/excel?${params}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Get filename from content-disposition header or use default
      const contentDisposition = response.headers.get("content-disposition");
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || `Members_Data_${new Date().toISOString().split("T")[0]}.xlsx`;

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return { message: "Export successful" };
    },
    onSuccess: () => {
      toast.success("Data exported successfully", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
    onError: () => {
      toast.error("Failed to export data", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
}
