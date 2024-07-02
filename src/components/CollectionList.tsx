import type { Collection } from '../types/collectionType'; 
import CollectionListItem from './CollectionListItem';

interface CollectionListProps {
    data: Collection[] | undefined
}

export default function CollectionList ({ data }: CollectionListProps) {

    const renderedCollectionListItems = data?.map(collection => {
        return (
            <CollectionListItem key={collection.id} collection={collection} />
        ); 
    }); 

    return (
        <div>
            {renderedCollectionListItems}
        </div>
    ); 
}
