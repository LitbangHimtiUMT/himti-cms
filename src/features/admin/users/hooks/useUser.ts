import { userService } from "@core/services/user"
import { useAuth } from "@features/auth/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export const useUser = () => {
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page') || 1
    const auth = useAuth()
    const query = useQuery({
        queryKey: ['user', { page }],
        queryFn: () => userService.get({ bearerToken: auth?.token, queryParams: { page: page ? Number(page) : undefined } })
    })
    return query
}