import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'; 
import type { User } from '../../types/userType'; 

import { 
    collection,
    getDocs,
    getDoc,
    setDoc, 
    doc, 
    query, 
    where
} from 'firebase/firestore'; 
import { firestore } from '../../firebaseSetup'; 

export const usersApi = createApi({
    reducerPath: 'users', 
    baseQuery: fakeBaseQuery(), 
    endpoints: (builder) => {
        return {
            fetchUsers: builder.query<User[], void>({
                async queryFn() {
                    try {
                        const ref = collection(firestore, 'users'); 
                        const querySnapshot = await getDocs(ref); 
                        const users: User[] = []; 
                        querySnapshot?.forEach(doc => {
                            users.push({...doc.data()} as User); 
                        }); 
                        return { data: users }; 
                    } catch (error) {
                        console.error(error); 
                        return { error: error}; 
                    }
                }

            }),
            addUser: builder.mutation<User, {user: User, username: string}>({
                async queryFn({user, username}) {
                    try {
                        const checkRef = doc(firestore, 'users', username); 
                        const userDoc = await getDoc(checkRef); 
                        if(userDoc.exists()) {
                            return { error: { message: "Username already exists" } };  
                        }

                        await setDoc(checkRef, user); 

                        return { data: user }; 
                    } catch (error) {
                        console.error("Error", error); 
                        return { error: error }; 
                    }
                }
            }), 
            fetchUserByUsername: builder.query<User, string>({
                async queryFn(username) {
                    try {
                        const ref = collection(firestore, 'users'); 
                        const q = query(ref, where('username', '==', username))
                        const querySnapshot = await getDocs(q); 
                        if(querySnapshot.empty){
                            return {error: { message: 'User not found' } }
                        }
                        const user = querySnapshot?.docs[0].data() as User; 

                        return { data: user }
                    } catch (error){
                        console.error('Err', error); 
                        return { error: error }
                    }
                }
            })
        }

    }
}); 

export const {
    useFetchUsersQuery, 
    useAddUserMutation, 
    useFetchUserByUsernameQuery
} = usersApi; 