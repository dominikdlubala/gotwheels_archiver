import { collectionsApi } from '../store'; 

export default function HomePage() {

    const useFetchCollectionsQuery = collectionsApi.endpoints.fetchCollections.useQuery; 

    console.log(useFetchCollectionsQuery({id: 1, firstName: 'Karolina', lastName: 'Kowal' })); 

    return (
        <div>
            Home
        </div>
    ); 
}