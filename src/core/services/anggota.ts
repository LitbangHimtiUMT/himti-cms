import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AnggotaModel } from "@core/model/anggota";

export const anggotaService = {
  get: request.get<ApiResponse<AnggotaModel[]>>(API_ENDPOINT.anggota),
  getById: request.get<ApiResponse<AnggotaModel>>(API_ENDPOINT.anggota),
  post: request.post<ApiResponse<AnggotaModel>>(API_ENDPOINT.anggota),
  put: request.put<ApiResponse<AnggotaModel>>(API_ENDPOINT.anggota),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.anggota),
};
