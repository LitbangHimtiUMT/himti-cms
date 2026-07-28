export interface MissionItem {
  title: string;
  description: string;
}

export interface PeriodeModel {
  id: string;
  period: string;
  name: string;
  vision: string;
  mission: string | MissionItem[];
  isActive: boolean;
  logo: string;
  createdAt?: string;
}

export interface PeriodeDTO {
  period: string;
  name: string;
  vision: string;
  mission: string;
  isActive: boolean;
  logo: File | string;
}
