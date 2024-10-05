import {
  CreateMeetingBodyRequest,
  GeneralMeetingBodyRequest,
} from "@core/model/meeting";
import { meetingService } from "@core/services/meeting";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalCreationOption {
  type: "create" | "update" | "delete";
  data?: GeneralMeetingBodyRequest;
}

export const useMeeting = () => {
  const [searchParams] = useSearchParams();
  const { eventMeetingId } = useParams();
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;

  const query = useQuery({
    queryKey: ["meetings", eventMeetingId],
    queryFn: () =>
      meetingService.get({
        path: `event-meeting/${eventMeetingId}`,
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
        },
      }),
  });
  return query;
};

export const useMeetingCreation = () => {
  const { eventMeetingId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ type, data }: ModalCreationOption) => {
      switch (type) {
        case "create":
          return meetingService.create({
            ...data,
            eventMeetingId,
          } as CreateMeetingBodyRequest);
       
        case "delete":
          return meetingService.delete({
            path: data?.meetingId,
          });
       
        case "update":
          return meetingService.update(
            {
              name: data?.name,
              description: data?.description,
              startTime: data?.startTime,
              endTime: data?.endTime,
            } as CreateMeetingBodyRequest,
            {
              path: data?.meetingId,
            }
          );
        default:
          return meetingService.update({
            ...data,
            eventMeetingId,
          } as CreateMeetingBodyRequest);
      }
    },
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate(`/admin/event-meeting/${eventMeetingId}`);
      queryClient.removeQueries({ queryKey: ["meetings"] });
      queryClient.removeQueries({ queryKey: ["event-meeting-by-id"] });
      queryClient.invalidateQueries({ queryKey: ["event-meeting-by-id"] });
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

export const useMeetingById = () => {
  const { meetingId } = useParams();
  const query = useQuery({
    queryKey: ["meeting-by-id", { meetingId }],
    queryFn: () => meetingService.getById({ path: meetingId }),
    refetchOnMount: "always",
  });

  return query;
};
