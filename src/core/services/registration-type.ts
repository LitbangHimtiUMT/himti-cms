import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import {
  RegistrationTypeCreation,
  RegistrationTypeModel,
  RegistrationTypeUpdate,
} from "@core/model/registration-type";

export const registrationTypeService = {
  get: request.get<ApiResponse<RegistrationTypeModel[]>>(
    API_ENDPOINT.registrationType
  ),
  create: request.post<ApiResponse, FormData | RegistrationTypeCreation>(
    API_ENDPOINT.registrationType
  ),
  delete: request.delete<ApiResponse>(API_ENDPOINT.registrationType),
  update: request.put<ApiResponse, FormData | RegistrationTypeUpdate>(
    API_ENDPOINT.registrationType
  ),
  getById: request.get<ApiResponse<RegistrationTypeModel>>(
    API_ENDPOINT.registrationType
  ),
};
