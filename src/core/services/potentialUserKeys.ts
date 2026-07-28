import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { PotentialUserKeyModel } from "@features/admin/potential-user-keys/model/potentialUserKey";

export const potentialUserKeysService = {
  get: request.get<ApiResponse<PotentialUserKeyModel[]>>(API_ENDPOINT.potentialUserKeys),
  post: request.post<ApiResponse<{ id: string; key: string }>>(API_ENDPOINT.potentialUserKeys),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.potentialUserKeys),
};
