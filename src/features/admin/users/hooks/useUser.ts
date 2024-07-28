import { userService } from "@core/services/user"
import { useAuth } from "@features/auth/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
    const auth = useAuth()
    const query = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.get({ bearerToken: auth?.token })
    })
    return query
}