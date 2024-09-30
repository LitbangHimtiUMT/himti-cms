import { AnggotaModel } from "@core/model/anggota";
import React from "react";

export type Jabatan =
  | "KETUA_HIMPUNAN"
  | "WAKIL_KETUA_HIMPUNAN"
  | "BENDAHARA"
  | "SEKRETARIS"
  | "KETUA_DEPARTMENT";

export interface StrukturalModel {
  id: string;
  image: string;
  isActive: true;
  jabatan: Jabatan;
  Member: AnggotaModel
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StrukturalDTO {
  memberId?: string | React.ChangeEvent<HTMLSelectElement>;
  jabatan?: Jabatan | "" | React.ChangeEvent<HTMLSelectElement>;
  image?: string | File;
  isActive?: boolean | string | React.ChangeEvent<HTMLSelectElement>;
}
