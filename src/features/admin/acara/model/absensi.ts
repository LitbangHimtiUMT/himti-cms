export interface AbsensiModel {
  id: number
  image: string
  coordinate: string
  address: string
  createdAt: string
  updatedAt: string
  acara: {
    id: string
    name: string
  }
  subAcara: {
    id: string
    name: string
  }
  user: {
    id: string
    name: string
    nim: string
  }
}