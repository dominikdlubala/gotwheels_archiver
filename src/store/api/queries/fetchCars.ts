import type { Car } from '../../../types/carType'; 

export async function fetchCars(id: number): Promise<Car[]> {

    const res = await fetch(`http://localhost:3005/cars?collectionId=${id}`); 
    const data = await res.json();  

    return data; 
}