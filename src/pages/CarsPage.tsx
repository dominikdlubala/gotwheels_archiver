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

export default function CarsPage() {

    const { user }= useAuth() as { user: FirebaseUser }; 
    const [modalOpen, setModalOpen] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const { collectionId } = useParams(); 

    const { data, isFetching, isError: isErrorFetching } = useFetchCarsQuery({ collectionId, userId: user.uid });   
    const [addCar, {isLoading: isAdding }] = useAddCarMutation(); 

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
            const car: Car = {
                name, 
                id: faker.string.uuid(), 
                userId: user.uid, 
                collectionId: collectionId ? collectionId : '', 
                imageUrl: downloadUrl
            }
            await addCar(car); 
            setModalOpen(false); 
            setIsSuccess(true); 
            setTimeout(() => setIsSuccess(false), 2000); 
        } catch(error) {
            console.error(error); 
        }
    }


    return (
        <div className="page-container">
            { isSuccess && <Prompt success>Car succesfully added</Prompt>}
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
                 /> 
        </div>
    )
}