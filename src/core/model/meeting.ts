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