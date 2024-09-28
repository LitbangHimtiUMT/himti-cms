export interface EventMeetingsModel {
  id:string
  name: string
  meetingCount: number
}

export interface EventMeetingCreation {
  name: string
  description?: string
}