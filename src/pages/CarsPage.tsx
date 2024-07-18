import { useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import { faker } from '@faker-js/faker'; 
import {
    ref, 
    uploadBytes, 
    getDownloadURL
} from 'firebase/storage'; 
import { storage } from '../firebaseSetup'; 
import  CarsList  from '../components/car/CarsList'; 
import CarsModal from '../components/car/CarsModal'; 
import { useFetchCarsQuery, useAddCarMutation } from '../store';
import Drawer from '../components/Drawer';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input'; 

import type { Car, User } from '../types/types'; 

export default function CarsPage() {

    const { user }= useAuth() as { user: User}; 

    const [modalOpen, setModalOpen] = useState(false); 

    const { collectionId } = useParams(); 

    const { data, isFetching, isError: isErrorFetching } = useFetchCarsQuery({ collectionId, userId: user.id });   
    const [addCar, {isLoading: isAdding, isError}] = useAddCarMutation(); 

    const [err, setErr] = useState(false); 

    const [searchTerm, setSearchTerm] = useState<string>(''); 

    const handleInputChange = (value:string) => {
        setSearchTerm(value); 
    }

    const handleModalSubmit = async (name: string, fileList: FileList) => {
        try {
            let downloadUrl = ''; 
            if(fileList && fileList.length > 0) {
                const file = fileList[0]; 
                const storageRef = ref(storage, `/images/${file.name}`); 
                const snapshot = await uploadBytes(storageRef, file); 
                downloadUrl = await getDownloadURL(snapshot.ref); 
            }
            if(name.length <= 0){
                setErr(true); 
            } else {
                const car: Car = {
                    name, 
                    id: faker.string.uuid(), 
                    userId: user.id, 
                    collectionId: collectionId ? collectionId : '', 
                    imageUrl: downloadUrl
                }
                await addCar(car); 
                setModalOpen(false); 
            }
        } catch(error) {
            console.error(error); 
        }
    }


    return (
        <div className="page-container">
                <div className="page-title">
                    <Drawer currentRoute='Cars'/>
                    <button className="btn-add" onClick={() => setModalOpen(true)}>+Add car</button>
                </div>
                    <div className="search search-cars">
                        <Input
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </div>
            <div className="page-section">
                <CarsList 
                    data={data?.filter(car => car.name.includes(searchTerm))} 
                    isLoading={isFetching}
                    isError={isErrorFetching}    
                />
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