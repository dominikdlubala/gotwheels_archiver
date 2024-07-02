import { User } from '../types/userType'; 
import { useFetchCollectionsQuery } from '../store';
import CollectionList from '../components/CollectionList'; 

interface CollectionsPageProps {
    user: User
}

export default function CollectionsPage({ user }: CollectionsPageProps) {    

    const {data} = useFetchCollectionsQuery(user.id); 


    return (
        <div>
            <CollectionList data={data} />
        </div>
    ); 
}