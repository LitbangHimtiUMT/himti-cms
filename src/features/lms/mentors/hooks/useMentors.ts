import { useQuery } from "@tanstack/react-query";
import { mentorService } from "../../../../core/services/mentors";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../../_global/hooks/useDebounce";

export const useMentors = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);
  const query = useQuery({
    queryKey: ["mentors", { search }],
    queryFn: () =>
      mentorService.get({
        params: {
          search,
        },
      }),
  });
  return query;
};
