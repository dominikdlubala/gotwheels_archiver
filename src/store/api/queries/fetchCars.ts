import type { Car } from '../../../types/types'; 

export async function fetchCars(id: number): Promise<Car[]> {

    const res = await fetch(`http://localhost:3005/cars?collectionId=${id}`); 
    const data = await res.json() as Car[];  

    return data; 
}