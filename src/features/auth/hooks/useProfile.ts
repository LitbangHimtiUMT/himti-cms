import { profileService } from "@core/services/profile";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
    const query = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get(),
    })
    return query
}