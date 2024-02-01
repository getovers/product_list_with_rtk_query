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
            providesTags: (result) => result
              ? [
                  ...result.map(({ id }) => ({ type: 'Products' as const, id })),
                  { type: 'Products', id: 'LIST' },
                ]
              : [{ type: 'Products', id: 'LIST' }],
        }),
        addProduct: build.mutation<Product, ProductPostBody>({
            query: (body) => ({url: 'goods', method: 'POST' as const, body: body}),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        }),
        deleteProduct: build.mutation<string, string>({
            query: (id) => ({url: `goods/${id}`, method: 'DELETE'}),
            invalidatesTags: [{type: 'Products' as const, id: 'LIST'}]
        })
    })
})

export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation } = goodsApi