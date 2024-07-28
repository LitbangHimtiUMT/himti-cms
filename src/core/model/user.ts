type Role = "ADMIN" | 'USER' | 'ANGGOTA'

export interface UserModel {
    "id": string
    "name": string
    "email": string
    "password": string
    "role": Role
    "nim": string
    "anggotaId": string
    "createdAt": string
    "updatedAt": string
}