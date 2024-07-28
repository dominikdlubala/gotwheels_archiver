import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    collection, 
    doc, 
    getDocs,
    setDoc,
    query, where
} from 'firebase/firestore'; 
import { firestore } from '../../firebaseSetup'; 
import type { Car } from '../../types/types'; 

export const carsApi = createApi({
    reducerPath: 'cars', 
    baseQuery: fakeBaseQuery(), 
    tagTypes: ['Cars'],
    endpoints: (builder) => {
        return {
            fetchCars: builder.query<Car[], {collectionId: string | undefined, userId: string}>({
                async queryFn({ collectionId, userId }) {
                    try {
                        const ref = collection(firestore, 'users');
                        const userRef = doc(ref, userId); 
                        const carsRef = collection(userRef, 'cars');  
                        let q = query(carsRef);  
                        if(collectionId){
                            q = query(carsRef, where('collectionId', '==', collectionId))
                        }
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
                            ...result.map(({toy_num}) => ({ type: 'Cars', toy_num} as const )), 
                            {type: 'Cars', id: 'LIST'}
                        ]
                    : 
                        [{ type: 'Cars', id: 'LIST'}]
            }), 
            fetchCarsByUserId: builder.query<Car[], string>({
                async queryFn(userId) {
                    try {
                        const ref = collection(firestore, 'cars'); 
                        const q = query(ref, where('userId', '==', userId)); 
                        const querySnapshot = await getDocs(q); 
                        if(querySnapshot.empty) {
                            return { error: { message: 'No cars in this collection '}}
                        } 
                        const cars = querySnapshot.docs.map(doc => doc.data() as Car);
                        return { data: cars };  
                    } catch(error) {
                        return { error }; 
                    }
                }
            }),
            addCar: builder.mutation<Car, { car: Car, userId: string}>({
                async queryFn({car, userId}) {
                    try {
                        const userRef = doc(firestore, 'users', userId); 
                        const usersCarsRef = collection(userRef, 'cars'); 
                        await setDoc(doc(usersCarsRef), car); 
                        return { data: car }; 
                    } catch (error) {
                        return { error: error }
                    }
                }, 
                invalidatesTags: [{ type: 'Cars', id: 'LIST'}]
            }), 
            fetchDatabaseCars: builder.query<Car[], number>({
                async queryFn(year) {
                    try {
                        const databaseRef = collection(firestore, 'hotwheels_database'); 
                        const yearRef = doc(databaseRef, year.toString()); 
                        const carsCollectionRef = collection(yearRef, 'cars');  
                        const querySnapshot = await getDocs(carsCollectionRef);
                        const cars = querySnapshot.docs.map(doc => doc.data() as Car);  
                        return { data: cars }
                    } catch (err) {
                        return { error: err }
                    }
                }
            })
        }
    }

})

export const { 
    useFetchCarsQuery, 
    useAddCarMutation, 
    useFetchDatabaseCarsQuery
 } = carsApi; 

