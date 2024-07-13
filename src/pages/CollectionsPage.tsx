import { useParams } from 'react-router-dom'; 
import { useState } from 'react'; 
import { faker } from '@faker-js/faker'; 
// import type { Collection } from '../types/types'; 
import CollectionList from '../components/collection/CollectionList'; 
import { useAddCollectionMutation } from '../store';
import  CollectionModal  from '../components/collection/CollectionModal'; 

import {
    ref, 
    uploadBytes, 
    getDownloadURL
} from 'firebase/storage'; 
import { storage } from '../firebaseSetup'; 


export default function CollectionsPage() {    
    
    const [modalOpen, setModalOpen] = useState(false); 
    const { userId } = useParams(); 

    const [addCollection, {isLoading: isAdding}] = useAddCollectionMutation();  

    const handleFormSubmit = async (data: {userId: string, name: string, file: FileList | undefined }) => {
        try {
                let downloadUrl = ''; 
                if(data.file && data.file.length > 0) {
                    const file = data.file[0] as File; 
                    const storageRef = ref(storage, `/images/${file.name}`); 
                    const snapshot = await uploadBytes(storageRef, file); 
                    downloadUrl = await getDownloadURL(snapshot.ref); 
                }
            

            const collection = {
                userId: data.userId,
                name: data.name, 
                id: faker.string.uuid(), 
                imageUrl: downloadUrl
            }

            await addCollection(collection); 
            setModalOpen(false); 
        } catch (error) {
            // popraw
            console.error(error); 
        }
    }

    return (
        <div>
            <div className="page-title">
                <h1>Collections</h1>
                <button className="btn-add" onClick={() => setModalOpen(true)}>+Add collection</button>
            </div>
            <div className="page-section">
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