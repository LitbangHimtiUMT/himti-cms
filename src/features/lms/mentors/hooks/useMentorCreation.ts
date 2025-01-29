import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mentorService } from "../../../../core/services/mentors";
import { MentorCreationDTO } from "../../../../core/model/mentors";
import { toast } from "react-toastify";

interface MutationType {
  type: "create" | "delete";
  data?: MentorCreationDTO;
  id?: string;
}

export const useMentorCreation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ type, data, id }: MutationType) => {
      switch (type) {
        case "create":
          return mentorService.assign(undefined, {
            path: data?.userId,
          });
        case "delete":
          return mentorService.delete({
            path: id,
          });
        default:
          return mentorService.assign(undefined, {
            path: data?.userId,
          });
      }
    },
    onError: (err) => toast.error(err.message),
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        theme: "dark",
      });
      queryClient.invalidateQueries({
        queryKey: ["mentors"],
      });
    },
  });
  return mutation;
};
