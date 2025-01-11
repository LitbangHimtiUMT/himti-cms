import {
  EventMeetingCreation,
  GeneralEventMeetingRequest,
} from "@core/model/event-meeting";
import { eventMeetingService } from "@core/services/event-meeting";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Options {
  page?: number;
  perPage?: number;
  eventMeetingId?: string;
  enabled?: boolean;
}

interface ModalCreationOption {
  type: "create" | "update" | "delete";
  data?: GeneralEventMeetingRequest;
}

export const useEventMeeting = (options?: Options) => {
  const { enabled = true } = options ?? {};
  const [searchParams] = useSearchParams();

  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;

  const query = useQuery({
    queryKey: ["event-meeting", { page, perPage }],
    queryFn: () =>
      eventMeetingService.get({
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
        },
      }),
    enabled,
  });
  return query;
};

export const useEventMeetingDropdown = (options?: Options) => {
  const { enabled = true, page, perPage } = options ?? {};

  const query = useQuery({
    queryKey: ["event-meeting-dropdown", { enabled, page, perPage }],
    queryFn: () =>
      eventMeetingService.get({
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
        },
      }),
    enabled,
  });
  return query;
};

export const useEventMeetingCreation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ type, data }: ModalCreationOption) => {
      switch (type) {
        case "create":
          return eventMeetingService.create(data as EventMeetingCreation);
        case "update":
          return eventMeetingService.update(
            {
              name: data?.name ?? "",
              description: data?.description,
            },
            {
              path: data?.eventMeetingId,
            }
          );
        case "delete":
          return eventMeetingService.delete({
            path: data?.eventMeetingId,
          });
        default:
          return eventMeetingService.create(data as EventMeetingCreation);
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate("/admin/event-meeting");
      queryClient.removeQueries({ queryKey: ["event-meeting"] });
      queryClient.invalidateQueries({
        queryKey: ["event-meeting"],
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

export const useEventMeetingById = (options?: Options) => {
  const { eventMeetingId } = useParams();
  const eventMeetingById = options?.eventMeetingId || eventMeetingId;
  const query = useQuery({
    queryKey: ["event-meeting-by-id", { eventMeetingById }],
    queryFn: () =>
      eventMeetingService.getById({
        path: eventMeetingById,
      }),
    enabled: !!eventMeetingById,
  });
  return query;
};
