import { meetingService } from "@core/services/meeting"
import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router-dom"

export const useMeeting = () => {
  const [searchParams] = useSearchParams()
  const { eventMeetingId } = useParams()
  const page = searchParams.get('page') || 1
  const perPage = searchParams.get('perPage') || 10

  const query = useQuery({
    queryKey: ['event-meeting', eventMeetingId],
    queryFn: () => meetingService.get({
      path: `event-meeting/${eventMeetingId}`,
      queryParams: {
        page: Number(page),
        perPage: Number(perPage),
      }
    })
  })
  return query
}