import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 
// import type { User } from '../../types/userType'; 
import type {Collection} from '../../types/types.ts'; 


export const collectionsApi = createApi({
    reducerPath: 'collections', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }), 
    tagTypes: ['Collections'],
    endpoints(builder) {
        return {
            fetchCollections: builder.query<Collection[], string>({
                query: (id: string) => {
                    return {
                        url: '/collections', 
                        params: {
                            userId: id
                        }, 
                        method: 'GET'
                    }
                }, 
                providesTags: (result) => 
                    result 
                    ? 
                        [
                            ...result.map(({userId}) => ({type: 'Collections', userId} as const)), 
                            { type: 'Collections', id: 'LIST'}
                        ]
                    :
                        [{ type: 'Collections', id: 'LIST'}]
            }), 
            addCollection: builder.mutation<Collection, { userId: string, name: string}>({
                query: ({userId, name}: {userId: string, name: string}) => {
                    return {
                        url: '/collections', 
                        method: 'POST', 
                        body: {
                            name: name,
                            userId: userId 
                        }
                    }
                }, 
                invalidatesTags: [{type: 'Collections', id: 'LIST'}]
            })
        }
    }
})

export const {
    useFetchCollectionsQuery, 
    useAddCollectionMutation
} = collectionsApi; 