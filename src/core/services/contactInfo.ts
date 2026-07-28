import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { ContactInfoModel } from "@features/admin/contact-info/model/contactInfo";

export const contactInfoService = {
  get: request.get<ApiResponse<ContactInfoModel[]>>(API_ENDPOINT.contactInfo),
  getById: request.get<ApiResponse<ContactInfoModel>>(API_ENDPOINT.contactInfo),
  post: request.post<ApiResponse<ContactInfoModel>>(API_ENDPOINT.contactInfo),
  batchPut: request.put<ApiResponse<ContactInfoModel[]>, ContactInfoModel[]>(`${API_ENDPOINT.contactInfo}/batch`),
  put: request.put<ApiResponse<ContactInfoModel>>(API_ENDPOINT.contactInfo),
  delete: request.delete<ApiResponse<void>>(API_ENDPOINT.contactInfo),
};
