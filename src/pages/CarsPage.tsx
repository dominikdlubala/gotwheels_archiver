import { useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import  CarsList  from '../components/car/CarsList'; 
import CarsModal from '../components/car/CarsModal'; 
import { useAddCarMutation } from '../store';

export default function CarsPage() {
    const [modalOpen, setModalOpen] = useState(false); 
    const { collectionId } = useParams(); 

    const [addCar, {isLoading: isAdding}] = useAddCarMutation(); 

    const handleModalSubmit = async (name: string) => {
        await addCar({ name, collectionId: Number(collectionId) }); 
        setModalOpen(false); 
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
            <CarsList collectionId={sentCollectionId} />
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