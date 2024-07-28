import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'; 
import type { User } from '../../types/types'; 
import { firestore } from '../../firebaseSetup'; 
import {
    doc, 
    setDoc
} from 'firebase/firestore'; 

export const usersApi = createApi({
    reducerPath: 'users', 
    baseQuery: fakeBaseQuery(), 
    endpoints(builder) {
        return {
            addUser: builder.mutation<User, User>({
                async queryFn({id, username}) {
                    try {
                        const user = {username} as User; 
                        await setDoc(doc(firestore, 'users', id), {
                            username
                        }); 
                        return { data: user}
                    } catch (err) {
                        return { error: err }
                    }
                }
            })
        }
    }
})

export const {
    useAddUserMutation
} = usersApi; 