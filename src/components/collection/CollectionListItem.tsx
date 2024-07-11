import { Link } from 'react-router-dom'; 
import type { Collection } from '../../types/types'; 
interface CollectionListItemProps {
    collection: Collection
}

export default function CollectionListItem({ collection }: CollectionListItemProps) {

    return (
        <div className="list-item collection-list-item">
            <div className="item-details">
                <h3>
                    {collection.name}
                </h3>
                {
                    collection.imageUrl
                    &&
                        <img className="collection-image" src={collection.imageUrl} alt="collection-image" />
                }
                <Link className="link" to={`/cars/${collection.id}`}>See cars</Link>
            </div>
        </div>
    ); 
}