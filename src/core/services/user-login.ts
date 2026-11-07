import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { UserLoginModel } from "@core/model/user-login";

export const userLoginService = {
  get: request.get<ApiResponse<UserLoginModel[]>>(API_ENDPOINT.userLogin),
  // DELETE /user-fcm/:fcmUserId (API user-fcm.route.ts). Jangan pakai
  // acaraService.delete di sini — itu menghapus acara, bukan user FCM.
  delete: request.delete<ApiResponse>(API_ENDPOINT.userLogin),
};
