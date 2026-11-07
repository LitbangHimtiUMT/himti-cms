import { eventRegistrationService } from "@core/services/event-registration";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import useDebounce from "@features/_global/hooks/useDebounce";

interface Options {
  page?: number;
  perPage?: number;
  eventRegistrationId?: string;
  registrationTypeId?: string;
  enabled?: boolean;
}

export const useEventRegistration = (options?: Options) => {
  const { enabled = true } = options ?? {};
  const [searchParams] = useSearchParams();

  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery = searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: ["event-registration", { page, perPage, search }],
    queryFn: () =>
      eventRegistrationService.get({
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
          search,
        },
      }),
    enabled,
  });
  return query;
};

export const useEventRegistrationByRegistrationType = (options?: Options) => {
  const { registrationTypeId } = useParams();
  const { enabled = true } = options ?? {};
  const [searchParams] = useSearchParams();

  const registrationTypeIdValue = options?.registrationTypeId || registrationTypeId;
  const page = options?.page || searchParams.get("page") || 1;
  const perPage = options?.perPage || searchParams.get("perPage") || 10;
  const searchQuery = searchParams.get("search") || undefined;
  const search = useDebounce(searchQuery as string, 500);

  const query = useQuery({
    queryKey: [
      "event-registration-by-registration-type",
      { registrationTypeId: registrationTypeIdValue, page, perPage, search },
    ],
    queryFn: () =>
      eventRegistrationService.getByRegistrationType({
        path: registrationTypeIdValue,
        queryParams: {
          page: Number(page),
          perPage: Number(perPage),
          search,
        },
      }),
    enabled: !!registrationTypeIdValue && enabled,
  });
  return query;
};
