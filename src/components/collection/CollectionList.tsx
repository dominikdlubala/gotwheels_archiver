import CollectionListItem from './CollectionListItem';
import { useFetchCollectionsQuery } from '../../store';

interface CollectionListProps {
    userId: string
}

export default function CollectionList ({ userId }: CollectionListProps) {

    const {data, isLoading, isError} = useFetchCollectionsQuery(userId); 

    let content; 
    if(isLoading) {
        content = <div>...Loading</div>
    }

    if(!isLoading && !isError) {
        content = data?.map(collection => (
            <div key={collection.id}> 
                <CollectionListItem key={collection.id} collection={collection} />
            </div>
        ))
    }

    return content; 
}
