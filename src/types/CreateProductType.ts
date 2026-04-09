export type CreateProductType = {
    name: string,
    description: string,
    quantity: number,
    storeId: string,
    departmentId: number,
    image: string
}
export type UpdateProductType = {
    id: string,
    name: string,
    description: string,
    quantity: number,
    image: string
}
export type DeleteProductType = {
    id: string,
    password: string
}