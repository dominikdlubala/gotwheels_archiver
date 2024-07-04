import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Car } from '../../types/carType'; 

export const carsApi = createApi({
    reducerPath: 'cars', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }), 
    tagTypes: ['Cars'],
    endpoints: (builder) => {
        return {
            fetchCars: builder.query<Car[], string>({
                query: (collectionId: string) => {
                    return {
                        url: '/cars', 
                        params: {
                            collectionId: collectionId
                        }, 
                        method: 'GET'
                    }
                }, 
                providesTags: (result) => 
                    result 
                    ? 
                        [
                            ...result.map(({id}) => ({ type: 'Cars', id} as const )), 
                            {type: 'Cars', id: 'LIST'}
                        ]
                    : 
                        [{ type: 'Cars', id: 'LIST'}]
            }), 
            addCar: builder.mutation<Car, Omit<Car, 'id'>>({
                query: (body) => {
                    return {
                        url: '/cars', 
                        method: 'POST', 
                        body
                    }
                }, 
                invalidatesTags: [{ type: 'Cars', id: 'LIST'}]
            })
        }
    }

})

export const { 
    useFetchCarsQuery, 
    useAddCarMutation
 } = carsApi; 

