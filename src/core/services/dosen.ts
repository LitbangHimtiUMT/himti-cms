import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { DosenModel } from "@core/model/dosen";

export const dosenService = {
    get: HTTP_REQUEST.get<ApiResponse<DosenModel[]>>(API_ENDPOINT.dosen),
}