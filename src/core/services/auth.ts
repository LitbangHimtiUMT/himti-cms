import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AuthLoginBodyModel, AuthLoginModel } from "@core/model/auth";

export const authService = {
  login: request.post<ApiResponse<AuthLoginModel>, AuthLoginBodyModel>(
    API_ENDPOINT.login
  ),
  check: request.get<ApiResponse>(API_ENDPOINT.check),
};
