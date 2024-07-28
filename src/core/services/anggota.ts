import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AnggotaModel } from "@core/model/anggota";

export const anggotaService = {
    get: HTTP_REQUEST.get<ApiResponse<AnggotaModel[]>>(API_ENDPOINT.anggota),
}