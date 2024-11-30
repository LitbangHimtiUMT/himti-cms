import { ApiResponse } from "@core/libs/api/types";
import { VersionModel } from "@core/model/version";
import { versionService } from "@core/services/version";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useVersion = () => {
  const query = useQuery({
    queryKey: ["version"],
    queryFn: () => versionService.get(),
  });

  return query;
};

export const useVersionCreation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: VersionModel) =>
      versionService.update(
        {
          playstoreLink: data.playstoreLink,
          appStoreLink: data.appStoreLink,
          androidVersion: data.androidVersion,
          iosVersion: data.iosVersion,
        },
        {
          path: `${data.id}`,
        },
      ),

    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });

      queryClient.removeQueries({ queryKey: ["version"] });
      return;
    },
    onError: (err: ApiResponse) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
    },
  });
  return mutation;
};
