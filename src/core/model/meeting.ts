export interface MeetingItem {
  id: string
  name: string
  description: string | null,
  startTime: string | Date
  endTime: string | Date
  isAlreadyAttend: boolean
}

export interface MeetingModel {
  eventMeeting: string
  meetings: MeetingItem[]
}

export interface CreateMeetingBodyRequest {
  name: string
  description?: string,
  startTime: Date,
  endTime: Date,
  eventMeetingId?: string
}

export interface UpdateMeetingBodyRequest {
  name: string
  description?: string,
  startTime: Date,
  endTime: Date,
}

export interface GeneralMeetingBodyRequest {
  name?: string
  description?: string
  startTime?: Date
  endTime?: Date
  eventMeetingId?: string
  meetingId?: string
}

export interface MeetingDTO {
  id: string
  name: string
  description?: string
  startTime: Date
  endTime: Date
  resume?: string
  isOpen: boolean
  isAlreadyAttend: boolean
  eventMeeting: {
    id: string
    name: string
  }
}