import { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import { FaTrashAlt } from 'react-icons/fa'; 
import { 
    doc, 
    getDocs, 
    collection
} from 'firebase/firestore'; 
import { firestore } from '../../firebaseSetup'; 

import type { Car, FirebaseUser } from '../../types/types'; 
import { useAddCarMutation, useAddCarToWishlistMutation, useRemoveCarMutation } from '../../store';
import { useAuth } from '../../hooks/useAuth'; 
import Prompt from '../../components/Prompt'; 

interface CarsListItemProps {
    car: Car
}


export default function CarsListItem({ car }: CarsListItemProps) {

    const { user } = useAuth() as { user: FirebaseUser}; 
    const [addCar] = useAddCarMutation(); 
    const [removeCar] = useRemoveCarMutation(); 
    const [addCarToWishlist] = useAddCarToWishlistMutation(); 
    const [alert, setAlert] = useState<{error: boolean, message: string} | null>(null); 
    const [showImage, setShowImage] = useState(false); 

    const { pathname } = useLocation(); 

    const handleCarAdd = async () => {
        try {
            const userRef = doc(firestore, 'users', user.uid); 
            const carsRef = collection(userRef, 'cars'); 
            const querySnapshot = await getDocs(carsRef); 
            const cars = querySnapshot.docs.map(doc => doc.data() as Car)
            const isAlreadyAdded = cars.some(doc => doc.model === car.model )
            if(isAlreadyAdded) {
                setAlert({error: true, message: 'You already have this car in your collection'}); 
                setTimeout(() => setAlert(null), 5000); 
            } else {
                await addCar({car, userId: user.uid}); 
                if(pathname.startsWith('/cars/wishlist')) {
                    await removeCar({docId: car.docId, userId: user.uid, wishlist: true})
                    setAlert({error: false, message: 'Successfully added the car into your collection'}); 
                    setTimeout(() => setAlert(null), 5000); 
                }
                setAlert({error: false, message: 'Successfully added the car into your collection'}); 
                setTimeout(() => setAlert(null), 5000); 
            }
        } catch (err) {
            setAlert({error: true, message: 'There was an error'}); 
            setTimeout(() => setAlert(null), 5000); 
        }
    }

    const handleCarRemove = async () => {
        try {
            await removeCar({userId: user.uid, docId: car.docId})
        } catch(err) {
            console.log(err); 
        }
    }

    const handleWishlistAdd = async () => {
        try {
            const userRef = doc(firestore, 'users', user.uid); 
            const wishlistRef = collection(userRef, 'wishlist'); 
            const querySnapshot = await getDocs(wishlistRef); 
            const wishlistCars = querySnapshot.docs.map(doc => doc.data() as Car); 
            if(wishlistCars.some(doc => doc.model === car.model)){
                setAlert({error: true, message: 'You already have this car on your wishlist'}); 
                setTimeout(() => setAlert(null), 5000); 
            } else {
                await addCarToWishlist({car, userId: user.uid})
                setAlert({error: false, message: 'Successfully added the car into your wishlist'}); 
                setTimeout(() => setAlert(null), 5000); 
            }
        } catch (err) {
            setAlert({error: true, message: 'There was an error'}); 
            setTimeout(() => setAlert(null), 5000); 
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => setShowImage(true), 100); 
        return () => clearTimeout(timer); 
    }, [])

    return (
            <div className="list-item cars-list-item">
                {
                    alert
                    &&
                    <Prompt error={alert.error} success={!alert.error} handleClose={() => setAlert(null)}>{alert.message}</Prompt>
                }
                {   
                    showImage && car.photo_url 
                    &&
                    <img src={car.firebase_url} alt="car-image" className="item-image car-image" />
                }

                    <div className="list-item-data">
                        <div className="list-item-details">
                            <p>
                                <span className="item-details-title">Model: <br></br></span>{car.model}
                            </p>
                            {
                                car.series 
                                &&
                                <p>
                                    <span className="item-details-title">Series: <br></br></span>{car.series}
                                </p>
                            }
                            {
                                car.series_num
                                &&
                                <p>
                                    <span className="item-details-title">Series #: <br></br></span>{car.series_num}
                                </p>
                            }
                            {
                                car.year
                                &&
                                <p>
                                    <span className="item-details-title">Year: <br></br></span>{car.year}
                                </p>
                            }
                            {
                                car.toy_num
                                &&
                                <p>
                                    <span className="item-details-title">Toy #: <br></br></span>{car.toy_num}
                                </p>
                            }
                        </div>

                        {
                            !pathname.startsWith('/cars/')
                            ?
                            <div className="list-item-buttons">
                                <button 
                                    className="btn-add-car btn-add-collection"
                                    onClick={handleCarAdd}
                                >
                                Add to collection
                                </button>
                                <button 
                                    className="btn-add-car btn-add-wishlist"
                                    onClick={handleWishlistAdd}
                                >
                                Add to wishlist
                                </button>
                            </div>
                            :
                            (
                                pathname.startsWith('/cars/wishlist')
                                ?
                                <div className="list-item-buttons">
                                    <button 
                                        className="btn-add-car btn-add-collection"
                                        onClick={handleCarAdd}
                                    >
                                    Add to collection
                                    </button>
                                </div>
                                :
                                <div className="list-item-buttons">
                                    <button 
                                        className="btn-remove-car"
                                        onClick={handleCarRemove}
                                    >
                                    <FaTrashAlt/>
                                    </button>
                                </div>
                            )
                        }
                    </div>
            </div>
    )
}