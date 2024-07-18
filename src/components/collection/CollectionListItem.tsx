import { Link } from 'react-router-dom'; 
import type { Collection } from '../../types/types'; 
interface CollectionListItemProps {
    collection: Collection
}

export default function CollectionListItem({ collection }: CollectionListItemProps) {

    return (
        <div className="list-item-container">
            <Link to={`/cars/${collection.id}`} state={{ collectionId: collection.id}} >
                <div className="list-item collection-list-item">
                    <div className="item-details">
                        {
                            collection.imageUrl
                            &&
                                <img className="item-image collection-image" src={collection.imageUrl} alt="collection-image" />
                        }
                        <h3>
                            {collection.name}
                        </h3>
                    </div>
                </div>
            </Link>
        </div>
    ); 
}