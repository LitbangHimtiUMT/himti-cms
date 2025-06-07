import { CategoriesModel } from "./categories";
import { ProfileModel } from "./profile";

export type StatusClassess = 'PUBLISH' | 'DRAFT'


export interface ClassModel {
  id: string;
  participantId: string;
  name: string;
  description: string;
  isAlreadyJoin: boolean;
  status: StatusClassess;
  code?: string;
  level: string;
  category: CategoriesModel;
  totalSession: number;
  thumbnail: string;
  price: number;
  creator: ProfileModel;
  progressStatus: "Completed" | "In Progress";
  total: {
    module: number;
    completed: number;
    precentage: number;
  };
  certificate: {
    id: string;
    code: string;
    classId: string;
    userId: string;
  } | null;
}
