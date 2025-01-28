import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { StrukturalModel } from "@features/admin/struktural/model/struktural";

export const strukturalService = {
  get: request.get<ApiResponse<StrukturalModel[]>>(API_ENDPOINT.struktural),
  getById: request.get<ApiResponse<StrukturalModel>>(API_ENDPOINT.struktural),
  post: request.post<ApiResponse<StrukturalModel>>(API_ENDPOINT.struktural),
  put: request.put<ApiResponse<StrukturalModel>>(API_ENDPOINT.struktural),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.struktural),
};
