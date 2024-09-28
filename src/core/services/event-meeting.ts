import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { EventMeetingCreation, EventMeetingsModel } from "@core/model/event-meeting";

export const eventMeetingService = {
  get: HTTP_REQUEST.get<ApiResponse<EventMeetingsModel[]>>(API_ENDPOINT.eventMeeting),
  create: HTTP_REQUEST.post<ApiResponse, EventMeetingCreation>(API_ENDPOINT.eventMeeting),
}