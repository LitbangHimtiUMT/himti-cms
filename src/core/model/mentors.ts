export interface MentorsDTO {
  id: string;
  name: string;
  email: string;
  balance: number;
  totalExpend?: number;
  totalIncome?: number;
}

export interface MentorCreationDTO {
  userId: string;
}
