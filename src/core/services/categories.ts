import { API_ENDPOINT } from "../configs/app";
import { request } from "../libs/api/config";
import { ApiResponse } from "../libs/api/types";
import { CategoriesModel, CategoryCreationDTO } from "../model/categories";

export const categoriesService = {
  get: request.get<ApiResponse<CategoriesModel[]>>(API_ENDPOINT.categories),
  create: request.post<ApiResponse, CategoryCreationDTO>(API_ENDPOINT.categories),
  update: request.put<ApiResponse, CategoryCreationDTO>(API_ENDPOINT.categories),
  delete: request.delete<ApiResponse>(API_ENDPOINT.categories),
};
