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
  jabatan: Jabatan;
  image: string;
  anggotaId: string;
  isActive: boolean;
  departmentId: string | null;
  createdAt: string;
  updatedAt: string;
  anggota: AnggotaModel;
}

export interface StrukturalDTO {
  anggotaId?: string | React.ChangeEvent<HTMLSelectElement>;
  jabatan?: Jabatan | "" | React.ChangeEvent<HTMLSelectElement>;
  image?: string | File;
  isActive?: boolean | string | React.ChangeEvent<HTMLSelectElement>;
}
