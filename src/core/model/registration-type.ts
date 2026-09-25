export enum RegistrationEventTypeEnum {
  BOOTCAMP = "BOOTCAMP",
  SEMINAR = "SEMINAR",
  LEARNING_GROUP = "LEARNING_GROUP",
}

export interface RegistrationTypeModel {
  id: string;
  name: string;
  year: number;
  image?: string | null;
  link?: string | null;
  type: RegistrationEventTypeEnum;
  isActive: boolean;
  eventId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistrationTypeCreation {
  name: string;
  year: number;
  type: RegistrationEventTypeEnum;
  isActive: boolean;
  image?: File | string | null;
  link?: string | null;
  eventId?: string | null;
}

export interface RegistrationTypeUpdate {
  registrationTypeId?: string;
  name?: string;
  year?: number;
  type?: RegistrationEventTypeEnum;
  isActive?: boolean;
  image?: File | string | null;
  link?: string | null;
  eventId?: string | null;
}
