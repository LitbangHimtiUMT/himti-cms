import { AnggotaModel } from "@core/model/anggota";
import React from "react";

export type Jabatan =
  | "KETUA_HIMPUNAN"
  | "WAKIL_KETUA_HIMPUNAN"
  | "BENDAHARA"
  | "SEKRETARIS"
  | "KETUA_DEPARTMENT";

// Department is stored as a short code and shown with its long label in
// the form dropdown. It is optional: rows without a department send "".
export type Department =
  | "PSDM"
  | "LITBANG"
  | "DANUS"
  | "KOMINFO"
  | "ORGANISASI";

export const departmentOptions: { value: Department | ""; label: string }[] = [
  { value: "", label: "Pilih Departemen" },
  { value: "PSDM", label: "Pemberdayaan Sumber Daya Manusia" },
  { value: "LITBANG", label: "Penelitian dan Pengembangan" },
  { value: "DANUS", label: "Dana Usaha" },
  { value: "KOMINFO", label: "Komunikasi dan Informasi" },
  { value: "ORGANISASI", label: "Keorganisasian" },
];

// Rows that sign certificates: the chair always signs; a department head
// signs only for PSDM, or when department is still unset. Unset is
// treated as a possible PSDM signer so a missing signature is flagged
// instead of silently skipped.
export function isStrukturalSigner(
  jabatan: Jabatan | "",
  department: Department | "" | null | undefined
): boolean {
  if (jabatan === "KETUA_HIMPUNAN") return true;
  if (jabatan === "KETUA_DEPARTMENT") return !department || department === "PSDM";
  return false;
}

export interface StrukturalModel {
  id: string;
  image: string;
  isActive: true;
  jabatan: Jabatan;
  department: Department | null;
  // Optional: a certificate still issues without a signature image, so
  // upload must never block create/update. Admins upload it later; the
  // signer warning flags rows that still miss it.
  signatureImage: string | null;
  Member: AnggotaModel
  memberId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StrukturalDTO {
  memberId?: string | React.ChangeEvent<HTMLSelectElement>;
  jabatan?: Jabatan | "" | React.ChangeEvent<HTMLSelectElement>;
  department?: Department | "" | React.ChangeEvent<HTMLSelectElement>;
  image?: string | File;
  signatureImage?: string | File;
  isActive?: boolean | string | React.ChangeEvent<HTMLSelectElement>;
}
