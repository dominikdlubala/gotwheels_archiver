import { useParams } from 'react-router-dom'; 
import { useState } from 'react'; 
// import type { Collection } from '../types/collectionType'; 
import CollectionList from '../components/collection/CollectionList'; 
import { useAddCollectionMutation } from '../store';
import  CollectionModal  from '../components/collection/CollectionModal'; 


export default function CollectionsPage() {    
    
    const [modalOpen, setModalOpen] = useState(false); 
    const { userId } = useParams(); 

    const [addCollection, {isLoading: isAdding}] = useAddCollectionMutation();  

    const handleFormSubmit = async (newCollection: {userId: string, name: string}) => {
        await addCollection(newCollection); 
        setModalOpen(false); 
    }

    return (
        <div>
            <CollectionList userId={userId || ''} />

            <button onClick={() => setModalOpen(true)}>Add collection</button>

            { modalOpen 
                && 
                <CollectionModal 
                    handleFormSubmit={handleFormSubmit} 
                    userId={userId || ''} 
                    isAdding={isAdding} 
                />}
        </div>
    ); 
}