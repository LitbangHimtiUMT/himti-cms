import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AttendanceModel } from "@core/model/attendance";

export const attendanceService = {
  get: request.get<ApiResponse<AttendanceModel[]>>(API_ENDPOINT.absensi),
};
