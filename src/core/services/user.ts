import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { UserModel } from "@core/model/user";

export const userService = {
    get: HTTP_REQUEST.get<ApiResponse<UserModel[]>>(API_ENDPOINT.users),
}