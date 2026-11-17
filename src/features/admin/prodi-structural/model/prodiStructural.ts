// Exact role text of the Kaprodi row; only this row signs certificates.
export const KAPRODI_ROLE = "Ketua Prodi Teknik Informatika";

export function isProdiStructuralSigner(role: string): boolean {
  return role === KAPRODI_ROLE;
}

export interface ProdiStructuralModel {
  id: string;
  name: string;
  role: string;
  bio: string;
  sequence: number;
  image: string;
  // Optional: a certificate still issues without a signature image, so
  // upload must never block create/update. Admins upload it later; the
  // signer warning flags the Kaprodi row while it still misses one.
  signatureImage: string | null;
  createdAt?: string;
}

export interface ProdiStructuralDTO {
  name: string;
  role: string;
  bio: string;
  sequence: number;
  image: File | string;
  signatureImage?: File | string;
}
