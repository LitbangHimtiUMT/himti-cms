import { ApiErrorResponse, ApiResponse } from "@core/libs/api/types";
import { AuthLoginBodyModel } from "@core/model/auth";
import { authService } from "@core/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAuthLogin() {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: (body: AuthLoginBodyModel) => authService.login(body),
        onSuccess: (res) => {
            console.log(res)
            localStorage.setItem("token", res?.data?.accessToken as string)
            navigate("/admin/dashboard")
        },
        onError: (err: ApiErrorResponse<ApiResponse>) => {
            console.log(err);
        }
    })
    return mutation
}


export function useAuth() {
    const token = localStorage.getItem("token") || ""

    if (token) {
        return { token }
    }
    return null
}