import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { DosenModel } from "@core/model/dosen";

export const dosenService = {
  get: request.get<ApiResponse<DosenModel[]>>(API_ENDPOINT.dosen),
  getById: request.get<ApiResponse<DosenModel>>(API_ENDPOINT.dosen),
  post: request.post<ApiResponse<DosenModel>>(API_ENDPOINT.dosen),
  put: request.put<ApiResponse<DosenModel>>(API_ENDPOINT.dosen),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.dosen),
};
