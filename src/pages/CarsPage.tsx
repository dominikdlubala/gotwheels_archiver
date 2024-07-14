import { useState } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import { faker } from '@faker-js/faker'; 
import  CarsList  from '../components/car/CarsList'; 
import CarsModal from '../components/car/CarsModal'; 
import { useAddCarMutation } from '../store';
import type { Car, User } from '../types/types'; 

import { useAuth } from '../hooks/useAuth'; 

import {
    ref, 
    uploadBytes, 
    getDownloadURL
} from 'firebase/storage'; 
import { storage } from '../firebaseSetup'; 

export default function CarsPage() {

    const { user }= useAuth() as { user: User}; 

    const [modalOpen, setModalOpen] = useState(false); 
    const location = useLocation(); 
    const { collectionId } = location.state; 

    const [addCar, {isLoading: isAdding, isError}] = useAddCarMutation(); 

    const [err, setErr] = useState(false); 

    const handleModalSubmit = async (name: string, fileList: FileList) => {
        try {
            let downloadUrl = ''; 
            if(fileList && fileList.length > 0) {
                const file = fileList[0]; 
                const storageRef = ref(storage, `/images/${file.name}`); 
                const snapshot = await uploadBytes(storageRef, file); 
                downloadUrl = await getDownloadURL(snapshot.ref); 
            }
            console.log(downloadUrl); 
            if(name.length <= 0){
                setErr(true); 
            } else {
                const car: Car = {
                    name, 
                    id: faker.string.uuid(), 
                    userId: user.id, 
                    collectionId, 
                    imageUrl: downloadUrl
                }
                await addCar(car); 
                setModalOpen(false); 
            }
        } catch(error) {
            console.error(error); 
        }
    }

    // kinda scuffed
    let sentCollectionId; 
    if(!collectionId) {
        sentCollectionId = ''; 
    } else {
        sentCollectionId = collectionId; 
    }

    return (
        <div>
            <div className="page-title">
                <h1>Cars</h1>
            </div>
            <div className="page-section">
                    
                <div className="page-section-header">
                    <h1>See your cars here</h1>
                    <button className="btn-add" onClick={() => setModalOpen(true)}>+Add car</button>
                </div>
                <CarsList collectionId={sentCollectionId} />
            </div>

                <CarsModal 
                    onSubmit={handleModalSubmit}
                    isAdding={isAdding}
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    error={err || isError}
                 /> 
        </div>
    )
}