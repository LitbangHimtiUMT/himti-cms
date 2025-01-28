import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { MentorCreationDTO, MentorsDTO } from "../model/mentors";

export const mentorService = {
  get: request.get<ApiResponse<MentorsDTO[]>>(API_ENDPOINT.mentors),
  assign: request.post<ApiResponse, MentorCreationDTO>(API_ENDPOINT.mentors),
};
