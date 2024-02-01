import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type Product = {
    id: string
    name: string
}
export type ProductPostBody = {
    name: string
}
export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    endpoints: (build) => ({
        getGoods: build.query<Product[], string>({
            query: (limit = '') => ({url: 'goods', params: {_limit: limit}}),
            providesTags: ['Products']
        }),
        addProduct: build.mutation<Product, ProductPostBody>({
            query: (body) => ({url: 'goods', method: 'POST', body: body}),
            invalidatesTags: ['Products']
        }),
        deleteProduct: build.mutation<string, string>({
            query: (id) => ({url: `goods/${id}`, method: 'DELETE'}),
            invalidatesTags: ['Products']
        })
    })
})

export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } = goodsApi