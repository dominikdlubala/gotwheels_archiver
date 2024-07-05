import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 
import type { User } from '../../types/userType'; 

export const usersApi = createApi({
    reducerPath: 'users', 
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }), 
    endpoints: (builder) => {
        return {
            fetchUsers: builder.query<User[], null>({
                query: () => {
                    return {
                        url: '/users', 
                        method: 'GET'
                    }
                }
            }), 
            addUser: builder.mutation<User, Omit<User, 'id'>>({
                query: (body) => {
                    return {
                        url: '/users', 
                        method: 'POST', 
                        body
                    }
                }
            })
        }

    }
}); 

export const {
    useFetchUsersQuery, 
    useAddUserMutation
} = usersApi; 