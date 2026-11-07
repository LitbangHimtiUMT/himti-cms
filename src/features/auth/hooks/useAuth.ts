import { AuthLoginBodyModel } from "@core/model/auth";
import { authService } from "@core/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useAuthLogin() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (body: AuthLoginBodyModel) => authService.login(body),
    onSuccess: (res) => {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        theme: "dark",
      });
      localStorage.setItem("token", res?.data?.access_token as string);
      navigate("/admin/acara");
    },
    onError: (err) => {
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

export function useCheckToken() {
  const query = useQuery({
    queryKey: ["checkToken"],
    queryFn: () => authService.check(),
  })
  return query
}

export function useAuth() {

  const token = localStorage.getItem("token") || "";
  const { data, isLoading } = useCheckToken()

  if (!token) {
    return undefined;
  }

  if (isLoading) {
    return {
      isLoading
    };
  }

  // A failed token check throws in the api client, which clears the
  // token and sends the user back to login, so there is nothing to
  // handle here beyond the loading state.
  return {
    data,
  };
}
