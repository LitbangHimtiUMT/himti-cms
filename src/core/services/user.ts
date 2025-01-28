import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { CreateAdminUserBodyDTO, UserModel } from "@core/model/user";

export const userService = {
  get: request.get<ApiResponse<UserModel[]>>(API_ENDPOINT.users),
  getById: request.get<ApiResponse<UserModel>>(API_ENDPOINT.users),
  post: request.post<ApiResponse<UserModel>>(API_ENDPOINT.users),
  put: request.put<ApiResponse<UserModel>>(API_ENDPOINT.users),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.users),
  createAdmin: request.post<ApiResponse, CreateAdminUserBodyDTO>(
    API_ENDPOINT.createUser
  ),
  updateAdmin: request.put<ApiResponse, CreateAdminUserBodyDTO>(
    API_ENDPOINT.users
  ),
};
