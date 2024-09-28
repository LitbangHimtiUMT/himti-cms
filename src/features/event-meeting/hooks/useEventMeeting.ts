import { EventMeetingCreation } from "@core/model/event-meeting";
import { eventMeetingService } from "@core/services/event-meeting";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalCreationOption {
  type: "create" | "update" | "delete";
  data?: EventMeetingCreation;
}

export const useEventMeeting = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;

  const query = useQuery({
    queryKey: ["event-meeting"],
    queryFn: () =>
      eventMeetingService.get({
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
        },
      }),
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
