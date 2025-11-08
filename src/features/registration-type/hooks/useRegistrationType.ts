import {
  RegistrationTypeCreation,
  RegistrationTypeUpdate,
} from "@core/model/registration-type";
import { registrationTypeService } from "@core/services/registration-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Options {
  page?: number;
  perPage?: number;
  registrationTypeId?: string;
  enabled?: boolean;
}

interface GeneralRegistrationTypeRequest {
  registrationTypeId?: string;
  name?: string;
  year?: number;
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

  const query = useQuery({
    queryKey: ["registration-type", { page, perPage }],
    queryFn: () =>
      registrationTypeService.get({
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
        },
      }),
    enabled,
  });
  return query;
};

export const useRegistrationTypeCreation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ type, data }: ModalCreationOption) => {
      switch (type) {
        case "create":
          return registrationTypeService.create(
            data as RegistrationTypeCreation
          );
        case "update":
          return registrationTypeService.update(
            {
              name: data?.name,
              year: data?.year,
            } as RegistrationTypeUpdate,
            {
              path: data?.registrationTypeId,
            }
          );
        case "delete":
          return registrationTypeService.delete({
            path: data?.registrationTypeId,
          });
        default:
          return registrationTypeService.create(
            data as RegistrationTypeCreation
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
