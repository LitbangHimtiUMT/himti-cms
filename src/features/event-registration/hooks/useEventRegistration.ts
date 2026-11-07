import {
  EventRegistrationCreation,
  GeneralEventRegistrationRequest,
} from "@core/model/event-registration";
import { eventRegistrationService } from "@core/services/event-registration";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useDebounce from "@features/_global/hooks/useDebounce";

interface Options {
  page?: number;
  perPage?: number;
  eventRegistrationId?: string;
  registrationTypeId?: string;
  enabled?: boolean;
}

interface ModalCreationOption {
  type: "create" | "update" | "delete";
  data?: GeneralEventRegistrationRequest;
}

export const useEventRegistration = (options?: Options) => {
  const { enabled = true } = options ?? {};
  const [searchParams] = useSearchParams();

  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery = searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: ["event-registration", { page, perPage, search }],
    queryFn: () =>
      eventRegistrationService.get({
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

export const useEventRegistrationCreation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ type, data }: ModalCreationOption) => {
      switch (type) {
        case "create":
          return eventRegistrationService.create(data as EventRegistrationCreation);
        case "update":
          return eventRegistrationService.update(
            {
              eventId: data?.eventId,
              userId: data?.userId,
              image: data?.image,
              material: data?.material,
              class: data?.class,
              name: data?.name,
            },
            {
              path: data?.eventRegistrationId,
            }
          );
        case "delete":
          return eventRegistrationService.delete({
            path: data?.eventRegistrationId,
          });
        default:
          return eventRegistrationService.create(data as EventRegistrationCreation);
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate("/admin/event-registration");
      queryClient.removeQueries({ queryKey: ["event-registration"] });
      queryClient.invalidateQueries({
        queryKey: ["event-registration"],
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

export const useEventRegistrationById = (options?: Options) => {
  const { eventRegistrationId } = useParams();
  const eventRegistrationById = options?.eventRegistrationId || eventRegistrationId;
  const query = useQuery({
    queryKey: ["event-registration-by-id", { eventRegistrationById }],
    queryFn: () =>
      eventRegistrationService.getById({
        path: eventRegistrationById,
      }),
    enabled: !!eventRegistrationById,
  });
  return query;
};

export const useEventRegistrationByRegistrationType = (options?: Options) => {
  const { registrationTypeId } = useParams();
  const { enabled = true } = options ?? {};
  const [searchParams] = useSearchParams();

  const registrationTypeIdValue = options?.registrationTypeId || registrationTypeId;
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery = searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: [
      "event-registration-by-registration-type",
      { registrationTypeId: registrationTypeIdValue, page, perPage, search },
    ],
    queryFn: () =>
      eventRegistrationService.getByRegistrationType({
        path: registrationTypeIdValue,
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
          search,
        },
      }),
    enabled: !!registrationTypeIdValue && enabled,
  });
  return query;
};
