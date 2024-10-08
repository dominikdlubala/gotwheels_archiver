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
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input'; 
import type { Car, FirebaseUser } from '../types/types'; 
import Prompt from '../components/Prompt'; 

import type { CarFormValues } from '../components/car/CarsModal'; 

export default function CarsPage() {

    const { user }= useAuth() as { user: FirebaseUser }; 
    const [modalOpen, setModalOpen] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const { collectionId, wishlist } = useParams(); 

    const { data, isFetching, isError: isErrorFetching } = useFetchCarsQuery({ collectionId, userId: user.uid, wishlist: wishlist ? true : false });   
    const [addCar, {isLoading: isAdding }] = useAddCarMutation(); 

    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const handleInputChange = (value:string) => {
        setSearchTerm(value); 
    }

    const handleModalSubmit = async ({car, fileList}: CarFormValues) => {
        try {
            let downloadUrl = ''; 
            if(fileList && fileList.length > 0) {
                const file = fileList[0]; 
                const storageRef = ref(storage, `/images/${file.name}`); 
                const snapshot = await uploadBytes(storageRef, file); 
                downloadUrl = await getDownloadURL(snapshot.ref); 
            }
            const carToAdd: Car = {
                model: car.model,
                series: car.series || '',
                series_num: car.series_num || '',
                toy_num: car.toy_num || '',
                year: car.year,
                photo_url: downloadUrl, 
                firebase_url: downloadUrl,
                docId: faker.string.uuid()
            }
            await addCar({car: carToAdd, userId: user.uid, userAdded: true}); 
            setModalOpen(false); 
            setIsSuccess(true); 
            setTimeout(() => setIsSuccess(false), 2000); 
        } catch(error) {
            console.error(error); 
        }
    }


    return (
        <div className="page-container">
            { isSuccess && <Prompt success handleClose={() => setIsSuccess(false)}>Car succesfully added</Prompt>}
                <h1>{ wishlist ? 'Your wishlist' : 'Your cars' }</h1>
                <div className="page-title">
                    <button className="btn-add" onClick={() => setModalOpen(true)}>+Add car</button>
                    <div className="search search-cars">
                        <Input
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            <div className="page-section">
                <CarsList 
                    data={data?.filter(car => car.model.includes(searchTerm))} 
                    isLoading={isFetching}
                    isError={isErrorFetching}    
                />
            </div>

                <CarsModal 
                    onSubmit={handleModalSubmit}
                    isAdding={isAdding}
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                 /> 
        </div>
    )
}