export interface EventRegistrationModel {
  id: string;
  eventId: string;
  userId: string;
  image?: string;
  registrationType: {
    id: string;
    name: string;
    year: number;
  };
  class: string;
  prodi?: string | null;
  institution?: string | null;
  name: string;
  nim: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventRegistrationCreation {
  eventId: string;
  userId: string;
  image?: File;
  material?: string;
  class: string;
  name: string;
}

export interface EventRegistrationUpdate {
  eventId?: string;
  userId?: string;
  image?: File;
  material?: string;
  class?: string;
  name?: string;
}

export interface GeneralEventRegistrationRequest {
  eventRegistrationId?: string;
  eventId?: string;
  userId?: string;
  image?: File;
  material?: string;
  class?: string;
  name?: string;
}
