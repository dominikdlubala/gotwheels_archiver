import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    collection, 
    doc, 
    getDocs,
    setDoc,
    query, where, limit
} from 'firebase/firestore'; 
import { firestore } from '../../firebaseSetup'; 
import type { Car } from '../../types/types'; 

const range = (min: number, max: number): number[] => {
    const len = max - min + 1; 
    const arr = new Array<number>(len); 
    for(let i = 0; i < len; i++){
        arr[i] = min + i; 
    }
    return arr; 
}
const yearArr = range(1968, 2024); 

export const carsApi = createApi({
    reducerPath: 'cars', 
    baseQuery: fakeBaseQuery(), 
    tagTypes: ['Cars'],
    endpoints: (builder) => {
        return {
            fetchCars: builder.query<Car[], {collectionId?: string, userId: string, wishlist?: boolean}>({
                async queryFn({ collectionId, userId, wishlist }) {
                    try {
                        const ref = collection(firestore, 'users');
                        const userRef = doc(ref, userId); 
                        let carsRef; 
                        if(wishlist)
                            carsRef = collection(userRef, 'wishlist')
                        else
                            carsRef = collection(userRef, 'cars');  
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
            addCarToWishlist: builder.mutation<Car, {car: Car, userId: string}>({
                async queryFn({car, userId}) {
                    try {
                        const userRef = doc(firestore, 'users', userId); 
                        const wishlistRef = collection(userRef, 'wishlist'); 
                        await setDoc(doc(wishlistRef), car); 
                        return { data: car }
                    } catch (err) {
                        return { error: err}
                    }
                }
            }),
            fetchDatabaseCars: builder.query<Car[], void>({
                async queryFn() {
                    try {
                        const data: Car[] = [];  
                        const databaseRef = collection(firestore, 'hotwheels_database'); 
                        for (const year of yearArr) {
                            const yearRef = doc(databaseRef, year.toString());
                            const carsCollectionRef = collection(yearRef, 'cars');   
                            const querySnapshot = await getDocs(carsCollectionRef); 
                            querySnapshot.docs.forEach(doc => data.push(doc.data() as Car))
                        }
                        return { data: data }
                    } catch (err) {
                        return { error: err}
                    }
                }
            }),
            fetchDatabaseCarsByYear: builder.query<Car[], number>({
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
            }), 
            fetchDatabaseCarsByModel: builder.query<Car[], string | null>({
                async queryFn(model) {
                    try {
                        if(!model) return { data: [] as Car[] }

                        const termForSearch = model.split(' ').map(word => word.slice(0,1).toUpperCase() + word.slice(1)).join(' '); 
                        const years = Array.from({length: 2024 - 1968 + 1}, (_, i) => i + 1968); 
                        const promises = years.map(async (year) => {
                            const carsRef = collection(firestore, 'hotwheels_database', year.toString(), 'cars'); 
                            const q = query(carsRef, where('model', '>=', termForSearch), where('model', '<=', termForSearch + '\uf8ff'), limit(10)); 
                            const querySnapshot = await getDocs(q); 
                            
                            return querySnapshot.docs.map(doc => doc.data() as Car); 
                        }); 

                        const resultsArray = await Promise.all(promises);
                        const results = resultsArray.flat() as Car[];  
                        const uniqueResults = results.reduce((acc, obj) => {
                            if(!acc.some(car => car.model === obj.model)){
                                acc.push(obj); 
                            }
                            return acc; 
                        }, [] as Car[])

                        return { data: uniqueResults }
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
    useAddCarToWishlistMutation,
    useFetchDatabaseCarsQuery,
    useFetchDatabaseCarsByYearQuery, 
    useFetchDatabaseCarsByModelQuery
 } = carsApi; 

