import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { SubAcaraModel } from "@core/model/subAcara";

export const subAcaraService = {
  get: request.get<ApiResponse<SubAcaraModel[]>>(API_ENDPOINT.subAcara),
  getById: request.get<ApiResponse<SubAcaraModel>>(API_ENDPOINT.subAcara),
  post: request.post<ApiResponse<SubAcaraModel>>(API_ENDPOINT.subAcara),
  put: request.put<ApiResponse<SubAcaraModel>>(API_ENDPOINT.subAcara),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.subAcara),
};
