import { useLoaderData } from 'react-router-dom'; 
import { useState } from 'react'; 
import type { Collection } from '../types/collectionType'; 
import CollectionList from '../components/CollectionList'; 
import { useAddCollectionMutation } from '../store';
import  CollectionModal  from '../components/CollectionModal'; 


export default function CollectionsPage() {    
    
    const [modalOpen, setModalOpen] = useState(false); 
    
    const { fetchResults } = useLoaderData() as { fetchResults: Collection[]}; 
    // const { data, isLoading, isError } = useFetchCollectionsQuery(fetchResults[0].userId); 
    const [addCollection, {isLoading: isAdding}] = useAddCollectionMutation();  

    
    const handleFormSubmit = async (newCollection: {userId: number, name: string}) => {
        await addCollection(newCollection); 
        setModalOpen(false); 
    }


    return (
        <div>
            <CollectionList userId={fetchResults[0].userId} />

            <button onClick={() => setModalOpen(true)}>Add collection</button>

            { modalOpen && <CollectionModal handleFormSubmit={handleFormSubmit} userId={fetchResults[0].userId} isAdding={isAdding} />}
        </div>
    ); 
}