import { dosenService } from "@core/services/dosen"
import useDebounce from "@features/_global/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export const useDosen = () => {
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page') || 1
    const searchQuery = searchParams.get('search') || undefined

    const search = useDebounce(searchQuery as string, 500)
    const query = useQuery({
        queryKey: ['dosens', { page, search }],
        queryFn: () => dosenService.get({ queryParams: { page: page ? Number(page) : undefined, search } })
    })
    return query
}