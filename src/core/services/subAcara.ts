import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { SubAcaraModel } from "@core/model/subAcara";
import { AbsensiModel } from "@features/admin/acara/model/absensi";
import { AcaraModel } from "@features/admin/acara/model/acara";

export const subAcaraService = {
  get: request.get<ApiResponse<SubAcaraModel[]>>(API_ENDPOINT.subAcara),
  getAbsensi: request.get<ApiResponse<AbsensiModel[]>>(API_ENDPOINT.absensi),
  getById: request.get<ApiResponse<AcaraModel>>(API_ENDPOINT.subAcara),
  post: request.post<ApiResponse<AcaraModel>>(API_ENDPOINT.subAcara),
  put: request.put<ApiResponse<AcaraModel>>(API_ENDPOINT.subAcara),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.subAcara),
};
