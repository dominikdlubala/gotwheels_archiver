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

    const handleModalClose = () => {
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
                    handleClose={handleModalClose}
                 /> 
        </div>
    )
}