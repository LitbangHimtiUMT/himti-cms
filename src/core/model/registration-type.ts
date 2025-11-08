export enum RegistrationEventTypeEnum {
  BOOTCAMP = "BOOTCAMP",
  SEMINAR = "SEMINAR",
  LEARNING_GROUP = "LEARNING_GROUP",
}

export interface RegistrationTypeModel {
  id: string;
  name: string;
  year: number;
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
  eventId?: string | null;
}

export interface RegistrationTypeUpdate {
  name?: string;
  year?: number;
  type?: RegistrationEventTypeEnum;
  isActive?: boolean;
  eventId?: string | null;
}
