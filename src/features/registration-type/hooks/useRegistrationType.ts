import { ApiOption } from "@core/libs/api/types";
import {
  RegistrationTypeCreation,
  RegistrationTypeUpdate,
} from "@core/model/registration-type";
import { registrationTypeService } from "@core/services/registration-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDebounce from "@features/_global/hooks/useDebounce";

interface Options {
  page?: number;
  perPage?: number;
  registrationTypeId?: string;
  enabled?: boolean;
}

interface GeneralRegistrationTypeRequest
  extends Partial<RegistrationTypeCreation>,
    Partial<RegistrationTypeUpdate> {
  registrationTypeId?: string;
}

interface ModalCreationOption {
  type: "create" | "update" | "delete";
  data?: GeneralRegistrationTypeRequest;
}

export const useRegistrationType = (options?: Options) => {
  const { enabled = true } = options ?? {};
  const [searchParams] = useSearchParams();

  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery = searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: ["registration-type", { page, perPage, search }],
    queryFn: () =>
      registrationTypeService.get({
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
          search,
        },
      }),
    enabled,
  });
  return query;
};

const buildPayload = (data: Record<string, any>) => {
  const hasFile = data.image instanceof File;
  if (hasFile) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "registrationTypeId") return;
      const val = data[key];
      if (val !== undefined && val !== null) {
        if (val instanceof File) {
          formData.append(key, val);
        } else {
          formData.append(key, String(val));
        }
      }
    });
    return { payload: formData, isFormData: true };
  }
  const { registrationTypeId, ...rest } = data;
  return { payload: rest, isFormData: false };
};

export const useRegistrationTypeCreation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ type, data = {} }: ModalCreationOption) => {
      const { payload, isFormData } = buildPayload(data);
      const apiOption: ApiOption | undefined = isFormData
        ? { contentType: "form-data" }
        : undefined;

      switch (type) {
        case "create":
          return registrationTypeService.create(
            payload as any,
            apiOption
          );
        case "update":
          return registrationTypeService.update(
            payload as any,
            {
              path: data?.registrationTypeId,
              ...apiOption,
            }
          );
        case "delete":
          return registrationTypeService.delete({
            path: data?.registrationTypeId,
          });
        default:
          return registrationTypeService.create(
            payload as any,
            apiOption
          );
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate("/admin/registration-type");
      queryClient.removeQueries({ queryKey: ["registration-type"] });
      queryClient.invalidateQueries({
        queryKey: ["registration-type"],
      });
    },
    onError: (res) => {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
};

export const useRegistrationTypeById = (options?: Options) => {
  const { registrationTypeId } = useParams();
  const registrationTypeById = options?.registrationTypeId || registrationTypeId;
  const query = useQuery({
    queryKey: ["registration-type-by-id", { registrationTypeById }],
    queryFn: () =>
      registrationTypeService.getById({
        path: registrationTypeById,
      }),
    enabled: !!registrationTypeById,
  });
  return query;
};

export const useRegistrationTypeToggleStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      registrationTypeId,
      isActive,
    }: {
      registrationTypeId: string;
      isActive: boolean;
    }) => {
      return registrationTypeService.update(
        {
          isActive,
        } as RegistrationTypeUpdate,
        {
          path: registrationTypeId,
        }
      );
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        theme: "dark",
      });
      queryClient.invalidateQueries({
        queryKey: ["registration-type"],
      });
      queryClient.invalidateQueries({
        queryKey: ["registration-type-by-id"],
      });
    },
    onError: (res) => {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
};
