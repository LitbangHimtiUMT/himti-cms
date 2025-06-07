import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { ClassModel } from "../model/classess";

export const classService = {
    get: request.get<ApiResponse<ClassModel[]>>(API_ENDPOINT.lms.class)
}