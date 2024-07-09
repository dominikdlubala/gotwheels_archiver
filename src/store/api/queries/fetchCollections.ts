import type { Collection } from '../../../types/types'; 

export async function fetchCollections(userId: number): Promise<Collection[]> {
    const res = await fetch(`http://localhost:3005/collections?userId=${userId}`); 
    const data = await res.json(); 

    return data; 
}