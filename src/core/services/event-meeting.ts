import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import {
  EventMeetingCreation,
  EventMeetingDTO,
  EventMeetingsModel,
} from "@core/model/event-meeting";

export const eventMeetingService = {
  get: request.get<ApiResponse<EventMeetingsModel[]>>(
    API_ENDPOINT.eventMeeting
  ),
  create: request.post<ApiResponse, EventMeetingCreation>(
    API_ENDPOINT.eventMeeting
  ),
  delete: request.delete<ApiResponse>(API_ENDPOINT.eventMeeting),
  update: request.post<ApiResponse, EventMeetingCreation>(
    API_ENDPOINT.eventMeeting
  ),
  getById: request.get<ApiResponse<EventMeetingDTO>>(API_ENDPOINT.eventMeeting),
};
