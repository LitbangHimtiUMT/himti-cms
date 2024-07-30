export interface AcaraModel {
  id?: string,
  name?: string
  description?: string
  isOpenAbsen?: boolean
  image?: File | string
  startTime?: Date
  endTime?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface AcaraDTO {
  name?: string
  description?: string
  isOpenAbsen?: boolean | string;
  isOpenRegister?: boolean | string;
  image?: File | string
  startTime?: Date | string
  endTime?: Date | string
}