import { acaraService } from "@core/services/acara";
import { subAcaraService } from "@core/services/subAcara";
import { useQuery } from "@tanstack/react-query";

interface Options {
    page?: number;
    perPage?: number;
    acaraId?: string

}

export function useDropdownAcara(options?: Options) {

    const page = options?.page || 1;
    const perPage = options?.perPage || 10;


    const query = useQuery({
        queryKey: ["acarasDropdown", { page, perPage }],
        queryFn: () =>
            acaraService.get({
                queryParams: {
                    perPage: perPage ? Number(perPage) : undefined,
                    page: page ? Number(page) : undefined,
                } as Options,
            }),
    });
    return query;
}
export function useDropdownSubAcara(options?: Options) {

    const page = options?.page || 1;
    const perPage = options?.perPage || 10;

    const query = useQuery({
        queryKey: ["subAcarasDropdown", { page, perPage, acaraId: options?.acaraId }],
        queryFn: () =>
            subAcaraService.get({
                queryParams: {
                    perPage: perPage ? Number(perPage) : undefined,
                    page: page ? Number(page) : undefined,
                    acaraId: options?.acaraId
                } as Options,
            }),
    });
    return query;
}