import { useParams } from 'react-router-dom'; 
import { useState } from 'react'; 
import { faker } from '@faker-js/faker'; 
// import type { Collection } from '../types/types'; 
import CollectionList from '../components/collection/CollectionList'; 
import { useAddCollectionMutation } from '../store';
import  CollectionModal  from '../components/collection/CollectionModal'; 


export default function CollectionsPage() {    


    // consider using useForm hook 
    
    const [modalOpen, setModalOpen] = useState(false); 
    const { userId } = useParams(); 

    const [addCollection, {isLoading: isAdding}] = useAddCollectionMutation();  

    const handleFormSubmit = async (data: {userId: string, name: string}) => {
        const collection = {
            ...data, 
            id: faker.string.uuid()
        }

        await addCollection(collection); 
        setModalOpen(false); 
    }

    return (
        <div>
            <div className="page-title">
                <h1>Collections</h1>
            </div>
            <div className="page-section">
                <div className="page-section-header"> 
                    <h1>See your collections here</h1>
                    <button className="btn-add" onClick={() => setModalOpen(true)}>+Add collection</button>
                </div>
                <CollectionList userId={userId || ''} />
            </div>

                <CollectionModal 
                    handleFormSubmit={handleFormSubmit} 
                    userId={userId || ''} 
                    isAdding={isAdding} 
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                />
        </div>
    ); 
}