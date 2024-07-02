import { Link } from 'react-router-dom'; 
import type { Collection } from '../types/collectionType'; 
interface CollectionListItemProps {
    collection: Collection
}

export default function CollectionListItem({ collection }: CollectionListItemProps) {


    return (
        <div>
            id: {collection.id} name: {collection.name} 
            <Link to={`/cars/?collectionId=${collection.id}`}>See cars</Link>
        </div>
    ); 
}