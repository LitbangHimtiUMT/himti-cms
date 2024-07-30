export interface DosenModel {
    id: string
    nidn: number,
    name: string
    email: string
    numberPhone: number,
    lesson: string | null,
    isActive: boolean,
    createdAt: string
    updatedAt: string
}