import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AngkatanDTO, AngkatanModel } from "@core/model/angkatan";

export const angkatanService = {
  get: request.get<ApiResponse<AngkatanModel[]>>(API_ENDPOINT.angkatan),
  post: request.post<ApiResponse, AngkatanDTO>(API_ENDPOINT.angkatan),
  put: request.put<ApiResponse, AngkatanDTO>(API_ENDPOINT.angkatan),
  getById: request.get<ApiResponse<AngkatanModel>>(API_ENDPOINT.angkatan),
  delete: request.delete<ApiResponse>(API_ENDPOINT.angkatan),
};
