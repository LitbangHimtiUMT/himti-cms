import { API_ENDPOINT } from "@core/configs/app";
import { request } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { NotificationBodyRequest } from "@core/model/notification";

export const notificationService = {
  sendAll: request.post<ApiResponse, NotificationBodyRequest>(
    API_ENDPOINT.notification
  ),
  sendSingle: request.post<ApiResponse, NotificationBodyRequest>(
    API_ENDPOINT.notification
  ),
};
