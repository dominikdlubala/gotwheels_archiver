import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 
// import type { User } from '../../types/userType'; 
import type {Collection} from '../../types/collectionType'; 


export const collectionsApi = createApi({
    reducerPath: 'collections', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }), 
    endpoints(builder) {
        return {
            fetchCollections: builder.query<Collection[], number>({
                query: (id: number) => {
                    return {
                        url: '/collections', 
                        params: {
                            userId: id
                        }, 
                        method: 'GET'
                    }
                }       
            })
        }
    }
})