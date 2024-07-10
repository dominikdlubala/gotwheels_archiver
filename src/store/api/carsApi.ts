import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    collection, 
    doc, 
    getDocs,
    setDoc,
    query, where
} from 'firebase/firestore'; 
import { FirebaseError } from 'firebase'; 
import { firestore } from '../../firebaseSetup'; 
import type { Car } from '../../types/types'; 

export const carsApi = createApi({
    reducerPath: 'cars', 
    baseQuery: fakeBaseQuery(), 
    tagTypes: ['Cars'],
    endpoints: (builder) => {
        return {
            fetchCars: builder.query<Car[], string>({
                async queryFn(collectionId) {
                    try {
                        const ref = collection(firestore, 'cars'); 
                        const q = query(ref, where('collectionId', '==', collectionId))
                        const querySnapshot = await getDocs(q); 
                        if(querySnapshot.empty){
                            return { error: { message: 'No cars in this collection'} }; 
                        }
                        const cars = querySnapshot.docs.map(doc => {
                            return doc.data() as Car; 
                        })
                        
                        return { data: cars}; 
                    } catch(error){
                        return { error: error }
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
            addCar: builder.mutation<Car, Car>({
                async queryFn(car) {
                    try {
                        const ref = doc(firestore, 'cars', car.name); 
                        await setDoc(ref, car); 
                        return { data: car }; 
                    } catch (error) {
                        return { error: error }
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

