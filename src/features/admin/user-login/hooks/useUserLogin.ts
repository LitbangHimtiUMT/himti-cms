import { userLoginService } from "@core/services/user-login";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useUserLogin() {
    const [searchParams] = useSearchParams();

    const page = searchParams.get("page") || 1;
    const perPage = searchParams.get("perPage") || 10;

    const query = useQuery({
        queryKey: ["userLogin"],
        queryFn: () => userLoginService.get({
            queryParams: {
                page: page ? Number(page) : undefined,
                perPage: perPage ? Number(perPage) : undefined
            }
        })
    })

    return query
}