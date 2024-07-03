import { fetchCollections } from '../queries/fetchCollections'; 

export async function collectionsLoader({ request }: { request: Request}) {
    const { searchParams } = new URL(request.url); 
    const userId = Number(searchParams.get('userId')); 

    const results = await fetchCollections(userId); 

    return {
        fetchResults: results
    }; 
}