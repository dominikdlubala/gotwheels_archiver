import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'; 
import {
    collection, 
    getDocs,
    setDoc, 
    doc, 
    query, where
} from 'firebase/firestore'; 
import { firestore } from '../../firebaseSetup.ts'; 
import type {Collection} from '../../types/types.ts'; 


export const collectionsApi = createApi({
    reducerPath: 'collections', 
    baseQuery: fakeBaseQuery(), 
    tagTypes: ['Collections'],
    endpoints(builder) {
        return {
            fetchCollections: builder.query<Collection[], string>({
                async queryFn(userId) {
                    try {
                        const ref = collection(firestore, 'collections'); 
                        const q = query(ref, where('userId', '==', userId))
                        const querySnapshot = await getDocs(q); 
                        if(querySnapshot.empty){
                            return { error: { message: 'No collections for this user'} }; 
                        }
                        const collections = querySnapshot.docs.map(doc => {
                            return doc.data() as Collection; 
                        })
                        
                        return { data: collections}; 
                    } catch(error){
                        return { error: error}
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
            addCollection: builder.mutation<Collection, Collection>({
                async queryFn(collection) {
                    try {
                        const ref = doc(firestore, 'collections', collection.name); 
                        await setDoc(ref, collection); 
                        return { data: collection };
                    } catch (error) {
                        return { error: error}; 
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