import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { PeriodeModel } from "@features/admin/periode/model/periode";

export const periodeService = {
  get: request.get<ApiResponse<PeriodeModel[]>>(API_ENDPOINT.periode),
  getActive: request.get<ApiResponse<PeriodeModel>>(`${API_ENDPOINT.periode}/active`),
  getById: request.get<ApiResponse<PeriodeModel>>(API_ENDPOINT.periode),
  post: request.post<ApiResponse<PeriodeModel>>(API_ENDPOINT.periode),
  put: request.put<ApiResponse<PeriodeModel>>(API_ENDPOINT.periode),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.periode),
};
