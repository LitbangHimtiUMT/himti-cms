import { attendanceService } from "@core/services/attendance";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

export const useAttendance = () => {
  const { meetingId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;
  return useQuery({
    queryKey: ["attendances", { meetingId, page, perPage }],
    queryFn: () =>
      attendanceService.get({
        path: `meeting/${meetingId}`,
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
        },
      }),
    enabled: !!meetingId,
  });
};
