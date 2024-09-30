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
  eventMeetingId: string
}