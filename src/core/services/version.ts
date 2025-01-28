import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { VersionModel } from "@core/model/version";

export const versionService = {
  get: request.get<ApiResponse<VersionModel>>(API_ENDPOINT.version),
  update: request.put<ApiResponse, VersionModel>(API_ENDPOINT.version),
};
