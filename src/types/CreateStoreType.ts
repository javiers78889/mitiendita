export type CreateStoreType = {
    name: string,
    description: string,
    cellphone: string
    image: string,
    foundationDate: string,
    province: string,
    distrito: string,
    corregimiento: string,
    categoryId: number,
    lat: number,
    lng: number
}
export type UpdateStoreType = {
    id: string,
    name: string,
    description: string,
    cellphone: string
    image: string,
    foundationDate: string,
    province: string,
    distrito: string,
    corregimiento: string,
    categoryId: number,
    lat: number,
    lng: number
}

export type DeleStoreType = {
    id: string,
    password: string
}