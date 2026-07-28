export interface ContactInfoModel {
  id: string;
  key: string;
  value: string;
  group: string;
  createdAt?: string;
}

export interface ContactInfoDTO {
  key: string;
  value: string;
  group: string;
}
