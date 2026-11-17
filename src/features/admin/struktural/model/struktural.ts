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
//
// Both values arrive as plain strings from the API and the forms, and
// jabatan arrives in TWO shapes: the list API returns it with spaces
// ("KETUA HIMPUNAN") while the detail API and the forms use underscores
// ("KETUA_HIMPUNAN"). Normalize before comparing so the check works
// for both.
export function isStrukturalSigner(
  jabatan: string,
  department: string | null | undefined
): boolean {
  const normalized = jabatan.replace(/ /g, "_");
  if (normalized === "KETUA_HIMPUNAN") return true;
  if (normalized === "KETUA_DEPARTMENT")
    return !department || department === "PSDM";
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
