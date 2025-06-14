import { useQuery } from "@tanstack/react-query";
import { mentorService } from "../../../../core/services/mentors";
import { useParams, useSearchParams } from "react-router-dom";
import useDebounce from "../../../_global/hooks/useDebounce";
import { CONFIG_APP } from "../../../../core/configs/app";

export const useMentors = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);
  const page = searchParams.get("page") || 1;
  const query = useQuery({
    queryKey: ["mentors", { search }],
    queryFn: () =>
      mentorService.get({
        params: {
          search,
          page: page ? Number(page) : undefined,
        },
        headers: {
          [CONFIG_APP.HIMTI_HEADER_KEY]: btoa(CONFIG_APP.HIMTI_SECRET_KEY),
        },
      }),
  });
  return query;
};

export const useMentorById = () => {
  const { mentorId } = useParams();

  const query = useQuery({
    queryKey: ["mentor-by-id", { mentorId }],
    queryFn: () =>
      mentorService.detail({
        path: mentorId,
      }),
  });
  return query;
};
