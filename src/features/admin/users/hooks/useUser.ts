import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import {
  CreateAdminUserBodyDTO,
  Role,
  UpdateUserRoleBodyDTO,
  UserDTO,
} from "@core/model/user";
import { userService } from "@core/services/user";
import useDebounce from "@features/_global/hooks/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Options {
  page?: number;
  perPage?: number;
  path?: string;
  enabled?: boolean;
  role?: Role
  roles?: string
}

type PayloadType =
  | "create"
  | "update"
  | "delete"
  | "admin-create"
  | "admin-update"
  | "update-role";

interface UserCreation {
  type: PayloadType;
  data?: UserDTO;
  adminData?: CreateAdminUserBodyDTO;
  roleData?: UpdateUserRoleBodyDTO;
  id?: string;
}

export const useUser = (options?: Options) => {
  const { enabled = true } = options || {};
  const [searchParams] = useSearchParams();
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery = searchParams.get("search") || undefined;

  const search = useDebounce(searchQuery as string, 500);
  const query = useQuery({
    queryKey: ["users", { page, perPage, search, role: options?.role, roles: options?.roles }],
    queryFn: () =>
      userService.get({
        queryParams: {
          perPage: perPage ? Number(perPage) : undefined,
          page: page ? Number(page) : undefined,
          search,
          ...options?.role && { role: options?.role },
          ...options?.roles && { roles: options?.roles }
        },
        path: options?.path || undefined,
      }),
    enabled,
  });
  return query;
};

export function useUserCreation() {
  // const auth = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const mutation = useMutation({
    mutationFn: async ({
      data,
      type,
      id,
      adminData,
      roleData,
    }: UserCreation) => {
      switch (type) {
        case "create":
          return userService.post(data);
        case "update":
          return userService.put(data, { path: id });
        case "delete":
          return userService.delete({ path: id });
        case "admin-create":
          return userService.createAdmin(adminData);
        case "admin-update":
          return userService.updateAdmin(adminData, {
            path: `admin/${params.id}`,
          });
        case "update-role":
          return userService.updateRole(roleData, {
            path: `${id}/role`,
          });
        default:
          return userService.post(data);
      }
    },
    onSuccess: (res, variables) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      // Jangan navigate kalau cuma update-role dari list (biar user tetap di halaman)
      if (variables.type !== "update-role") {
        navigate("/admin/user");
      }

      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userById"] });
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

export function useUserById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["userById", id],
    queryFn: () => userService.getById({ path: id }),
  });
}
