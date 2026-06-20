import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { categoriesService } from "../../../../core/services/categories";
import { CategoryCreationDTO } from "../../../../core/model/categories";

interface MutationType {
  type: "create" | "update" | "delete";
  data?: CategoryCreationDTO;
  id?: string;
}

export const useCategoryCreation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ type, data, id }: MutationType) => {
      switch (type) {
        case "create":
          return categoriesService.create(data);
        case "update":
          return categoriesService.update(data, { path: id });
        case "delete":
          return categoriesService.delete({ path: id });
        default:
          return categoriesService.create(data);
      }
    },
    onError: (err: { message?: string }) =>
      toast.error(err?.message ?? "Action failed"),
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: true,
        theme: "dark",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  return mutation;
};
