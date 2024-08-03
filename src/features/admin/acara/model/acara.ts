import React from "react";

export interface AcaraModel {
  id: string;
  name: string;
  description: string;
  isOpenAbsen: boolean;
  image: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface subAcara {
  id: string;
  name: string;
  description: string;
  isOpenAbsen: boolean;
  image: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AcaraDetailModel extends AcaraModel {
  subAcara: subAcara[];
}

export interface AcaraDTO {
  name?: string;
  description?: string;
  isOpenAbsen?: boolean | string | React.ChangeEvent<HTMLSelectElement>;
  isOpenRegister?: boolean | string;
  image?: File | string;
  startTime?: Date | string;
  endTime?: Date | string;
}
