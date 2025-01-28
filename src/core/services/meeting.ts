import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import {
  CreateMeetingBodyRequest,
  MeetingDTO,
  MeetingItem,
  MeetingModel,
  UpdateMeetingBodyRequest,
} from "@core/model/meeting";

export const meetingService = {
  get: request.get<ApiResponse<MeetingModel>>(API_ENDPOINT.meeting),
  getAll: request.get<ApiResponse<MeetingItem[]>>(API_ENDPOINT.meeting),
  create: request.post<ApiResponse, CreateMeetingBodyRequest>(
    API_ENDPOINT.meeting
  ),
  delete: request.delete<ApiResponse>(API_ENDPOINT.meeting),
  update: request.put<ApiResponse, UpdateMeetingBodyRequest>(
    API_ENDPOINT.meeting
  ),
  getById: request.get<ApiResponse<MeetingDTO>>(API_ENDPOINT.meeting),
};
