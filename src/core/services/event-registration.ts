import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import {
  EventRegistrationCreation,
  EventRegistrationModel,
  EventRegistrationUpdate,
} from "@core/model/event-registration";

export const eventRegistrationService = {
  get: request.get<ApiResponse<EventRegistrationModel[]>>(
    API_ENDPOINT.eventRegistration
  ),
  create: request.post<ApiResponse, EventRegistrationCreation>(
    API_ENDPOINT.eventRegistration
  ),
  delete: request.delete<ApiResponse>(API_ENDPOINT.eventRegistration),
  update: request.put<ApiResponse, EventRegistrationUpdate>(
    API_ENDPOINT.eventRegistration
  ),
  getById: request.get<ApiResponse<EventRegistrationModel>>(
    API_ENDPOINT.eventRegistration
  ),
  getByRegistrationType: request.get<ApiResponse<EventRegistrationModel[]>>(
    API_ENDPOINT.eventRegistrationByRegistrationType
  ),
};
