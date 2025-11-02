export interface EventRegistrationModel {
  id: string;
  eventId: string;
  userId: string;
  image?: string;
  material?: string;
  class: string;
  name: string;
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
