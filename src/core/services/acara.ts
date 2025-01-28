import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import {
  AcaraDetailModel,
  AcaraModel,
} from "@features/admin/acara/model/acara";

export const acaraService = {
  get: request.get<ApiResponse<AcaraModel[]>>(API_ENDPOINT.acara),
  getById: request.get<ApiResponse<AcaraDetailModel>>(API_ENDPOINT.acara),
  post: request.post<ApiResponse<AcaraModel>>(API_ENDPOINT.acara),
  put: request.put<ApiResponse<AcaraModel>>(API_ENDPOINT.acara),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.acara),
};
