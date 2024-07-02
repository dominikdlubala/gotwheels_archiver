import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'; 
import type { User } from '../../types/userType'; 

export const collectionsApi = createApi({
    reducerPath: 'collections', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:3005'
    }), 
    endpoints(builder) {
        return {
            fetchCollections: builder.query({
                query: (user: User) => {
                    return {
                        url: '/collections', 
                        params: {
                            userId: user.id
                        }, 
                        method: 'GET'
                    }
                }       
            }) 
        }
    }
})