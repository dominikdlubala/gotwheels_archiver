import { fetchCars } from '../queries/fetchCars'; 

export async function carsLoader({ request }: {request: Request}) {

    const { searchParams } = new URL(request.url); 
    const collectionId = Number(searchParams.get('collectionId')) ; 

    const results = await fetchCars(collectionId); 

    return {
        fetchResults: results
    }
}