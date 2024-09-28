import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { MeetingModel } from "@core/model/meeting";

export const meetingService = {
  get: HTTP_REQUEST.get<ApiResponse<MeetingModel>>(API_ENDPOINT.meeting)
}