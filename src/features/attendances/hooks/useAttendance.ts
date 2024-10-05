import { attendanceService } from "@core/services/attendance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useAttendance = () => {
    const { meetingId } = useParams();
    return useQuery({
        queryKey: ["attendances", meetingId],
        queryFn: () => attendanceService.get({ path: `meeting/${meetingId}` }),
        enabled: !!meetingId,
    });
}