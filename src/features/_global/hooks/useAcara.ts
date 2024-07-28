import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { acaraService } from "@core/services/acara";
import { useAuth } from "@features/auth/hooks/useAuth";

interface Options {
  page?: number,
  perPage?: number
}

type PayloadType = 'create' | 'update' | 'delete'

interface AcaraCreation {
  type: PayloadType
  data?: FormData
  id?: string
}

export function useAcara(options?: Options) {
  const [searchParams] = useSearchParams()
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const query = useQuery({
    queryKey: ['acaras', { page, perPage }],
    queryFn: () => acaraService.get({
      queryParams: {
        perPage: perPage ? Number(perPage) : undefined,
        page: page ? Number(page) : undefined
      }
    })
  })
  return query
}

export function useAcaraCreation() {
  const auth = useAuth();
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: async ({ data, type, id }: AcaraCreation) => {
      switch (type) {
        case 'create':
          return acaraService.post(data, { contentType: "form-data", bearerToken: auth?.token })
        case 'update':
          return acaraService.put(data, { contentType: "form-data", path: id, bearerToken: auth?.token })
        case 'delete':
          return acaraService.delete({ path: id, bearerToken: auth?.token })
        default:
          return acaraService.post(data, { contentType: "form-data", bearerToken: auth?.token })
      }
    },
    onSuccess: (res) => {
      console.log(res);      
      navigate('/admin/acara')

      queryClient.removeQueries({ queryKey: ['acaras'] })
      queryClient.removeQueries({ queryKey: ['acarasById'] })
      return
    },
    onError: (err: ApiErrorResponse<ApiResponse>) => {
      console.log(err);
    }

  })
  return mutation
}

export function useAcaraById() {
  const { id } = useParams()
  return useQuery({
    queryKey: ["acarasById", id],
    queryFn: () => acaraService.getById({ path: id }),
    enabled: !!id,
  });
}