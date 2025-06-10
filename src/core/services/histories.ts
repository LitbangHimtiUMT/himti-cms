import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { HistoriesDTO } from "../model/histories";

export const historiesService = {
    get: request.get<ApiResponse<HistoriesDTO[]>>(API_ENDPOINT.histories)
}