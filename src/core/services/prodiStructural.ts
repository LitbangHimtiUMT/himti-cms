import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { ProdiStructuralModel } from "@features/admin/prodi-structural/model/prodiStructural";

export const prodiStructuralService = {
  get: request.get<ApiResponse<ProdiStructuralModel[]>>(API_ENDPOINT.prodiStructural),
  getById: request.get<ApiResponse<ProdiStructuralModel>>(API_ENDPOINT.prodiStructural),
  post: request.post<ApiResponse<ProdiStructuralModel>>(API_ENDPOINT.prodiStructural),
  put: request.put<ApiResponse<ProdiStructuralModel>>(API_ENDPOINT.prodiStructural),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.prodiStructural),
};
