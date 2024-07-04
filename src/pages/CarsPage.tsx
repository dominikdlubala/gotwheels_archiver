import { useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import  CarsList  from '../components/car/CarsList'; 
import CarsModal from '../components/car/CarsModal'; 
import { useAddCarMutation } from '../store/api/carsApi';

export default function CarsPage() {
    const [modalOpen, setModalOpen] = useState(false); 
    const { collectionId } = useParams(); 

    console.log(Number(collectionId)); 

    const [addCar, {isLoading: isAdding}] = useAddCarMutation(); 

    const handleModalSubmit = async (name: string) => {
        await addCar({ name, collectionId: Number(collectionId) }); 
        setModalOpen(false); 
    }

    return (
        <div>
            <CarsList collectionId={collectionId} />
            <button onClick={() => setModalOpen(true)}>Add car</button>

            {
                modalOpen 
                &&
                <CarsModal 
                    onSubmit={handleModalSubmit}
                    isAdding={isAdding}
                 /> 
            }
        </div>
    )
}