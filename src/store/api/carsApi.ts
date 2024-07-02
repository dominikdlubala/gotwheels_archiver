import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Car } from '../../types/carType'; 

export const carsApi = createApi({
    reducerPath: 'cars', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }), 
    endpoints: (builder) => {
        return {
            fetchCars: builder.query<Car[], number>({
                query: (collectionId: number) => {
                    return {
                        url: '/cars', 
                        params: {
                            collectionId: collectionId
                        }, 
                        method: 'GET'
                    }
                }
            })
        }
    }

})


