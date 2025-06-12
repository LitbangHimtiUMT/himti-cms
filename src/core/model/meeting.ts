import { EventMeetingsModel } from "./event-meeting";

export interface MeetingItem {
  id: string;
  name: string;
  description: string | null;
  startTime: string | Date;
  endTime: string | Date;
  eventMeeting: {
    id: string;
    name: string;
  };
  class?: {
    id: string;
    name: string;
  }
}

export interface MeetingModel {
  eventMeeting: EventMeetingsModel;
  meetings: MeetingItem[];
  meeting: MeetingItem[];
}

export interface CreateMeetingBodyRequest {
  name: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  eventMeetingId?: string;
  classId?: string
}

export interface UpdateMeetingBodyRequest {
  name: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  classId?: string
}

export interface GeneralMeetingBodyRequest {
  name?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  eventMeetingId?: string;
  meetingId?: string;
}

export interface MeetingDTO {
  id: string;
  name: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  resume?: string;
  isOpen: boolean;
  class?: {
    id: string;
    name: string;
  }
  isAlreadyAttend: boolean;
  eventMeeting: {
    id: string;
    name: string;
  };
}
