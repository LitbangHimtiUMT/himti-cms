export interface ProdiStructuralModel {
  id: string;
  name: string;
  role: string;
  bio: string;
  sequence: number;
  image: string;
  createdAt?: string;
}

export interface ProdiStructuralDTO {
  name: string;
  role: string;
  bio: string;
  sequence: number;
  image: File | string;
}
