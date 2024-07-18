import CollectionListItem from './CollectionListItem';
import { useFetchCollectionsQuery } from '../../store';
import type { Collection } from '../../types/types'; 

interface CollectionListProps {
    data?: Collection[]; 
    isLoading: boolean; 
    isError: boolean; 
}

export default function CollectionList ({ data, isLoading, isError }: CollectionListProps) { 

    let content; 
    if(isLoading) {
        content = <div>...Loading</div>
    }

    if(!isLoading && !isError) {
        content = data?.map(collection => (
                <CollectionListItem key={collection.id} collection={collection} />
        ))
    }

    return (
        <div className="list collection-list"> 
            {content}
        </div>
    );
}
