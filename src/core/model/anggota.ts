export interface AnggotaModel {
    id: string
    nim: number,
    name: string
    email: string | null,
    angkatan: {
        id: string
        year: number
    },
    facebook: string | null,
    instagram: string | null,
    linkedin: string | null,
    twitter: string | null,
    isActive: boolean,
    createdAt: string | Date,
    updatedAt: string | Date
}