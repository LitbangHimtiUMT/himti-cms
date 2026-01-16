export interface ExperienceModel {
  id: string;
  role: string;
  company: string;
  experienceYear: number;
  isActive: boolean;
}

export interface PotentialUserModel {
  id: string;
  name: string;
  nim: string | null;
  experience: ExperienceModel[];
}
